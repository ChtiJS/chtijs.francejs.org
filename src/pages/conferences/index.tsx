import { useEffect, useState } from 'react';
import useSWR from 'swr';
import lunr, { type Index } from 'lunr';
import { join as pathJoin } from 'path';
import Layout from '../../layouts/main';
import ContentBlock from '../../components/contentBlock';
import Heading1 from '../../components/h1';
import Heading2 from '../../components/h2';
import Paragraph from '../../components/p';
import Anchor from '../../components/a';
import styles from './index.module.scss';
import { readEntries } from '../../utils/frontmatter';
import { toASCIIString } from '../../utils/ascii';
import { readParams } from '../../utils/params';
import { parseMarkdown } from '../../utils/markdown';
import { buildSearchIndex } from '../../utils/search';
import type { FrontMatterResult } from 'front-matter';
import type { MarkdownRootNode } from '../../utils/markdown';
import type { GetStaticProps } from 'next';
import type { BuildQueryParamsType } from '../../utils/params';

export type Metadata = {
  leafname?: string;
  title: string;
  description: string;
  date: string;
  draft: boolean;
  tags: string[];
  categories: string[];
  illustration?: {
    url: string;
    alt: string;
  };
  lang: string;
  location: string;
};
export type Entry = {
  id: string;
  content: MarkdownRootNode;
} & Metadata;

export type BaseProps = {
  title: string;
  description: string;
  entries: Entry[];
  pagesCount: number;
};
export type Props = BaseProps & {
  page: number;
};

const PARAMS_DEFINITIONS = {
  page: {
    type: 'number',
    mode: 'unique',
  },
} as const;

type Params = BuildQueryParamsType<typeof PARAMS_DEFINITIONS>;

const POSTS_PER_PAGE = 10;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const BlogEntries = ({
  title,
  description,
  entries,
  page,
  pagesCount,
}: Props) => {
  const [search, setSearch] = useState('');
  const [searchIndex, setSearchIndex] = useState<Index>();
  const [searchResults, setSearchResults] = useState<
    { id: string; title: string; description: string }[]
  >([]);
  const { data, error, isLoading } = useSWR(
    // Only load the search data when searching 🤷
    search ? '/conferencesSearchIndex.json' : null,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setSearchIndex(lunr.Index.load(data.index));
    } else {
      setSearchIndex(undefined);
    }
  }, [data]);

  useEffect(() => {
    if (searchIndex && search) {
      setSearchResults(
        searchIndex.search(search).map((result) => ({
          result,
          id: result.ref,
          ...data.metadata[result.ref],
        }))
      );
    } else {
      setSearchResults([]);
    }
  }, [data, searchIndex, search]);

  return (
    <Layout title={title} description={description}>
      <ContentBlock className="title">
        <Heading1 className="title">Résumés des rencontres</Heading1>
        <Paragraph>
          Découvrez le résumé de chacune de nos rencontres ChtiJS.
        </Paragraph>
        {page === 1 ? (
          <Paragraph>
            <label className={styles.labels}>
              <span>Recherche :</span>
              <input
                type="search"
                placeholder="Rechercher une conference"
                value={search}
                className={styles.inputs}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </label>
          </Paragraph>
        ) : null}
        {search ? (
          error ? (
            <Paragraph>Impossible de charger l’index de recherche.</Paragraph>
          ) : isLoading ? (
            <Paragraph>Chargement de l’index de recherche...</Paragraph>
          ) : searchResults.length ? (
            <Paragraph>
              {searchResults.length} résultat
              {searchResults.length > 1 ? 's' : ''} pour la recherche “{search}
              ”.
            </Paragraph>
          ) : (
            <Paragraph>Aucun résultat pour la recherche “{search}”.</Paragraph>
          )
        ) : null}
        <div className="entries">
          {(
            (search ? searchResults : entries) as Pick<
              Entry,
              'id' | 'title' | 'description' | 'illustration'
            >[]
          ).map((entry) => (
            <div className={styles.entry_item} key={entry.id}>
              {entry.illustration ? (
                <Paragraph className={styles.entry_illustration}>
                  <Anchor href={`/conferences/${entry.id}`}>
                    <img
                      src={entry.illustration.url}
                      alt={entry.illustration.alt}
                      className={styles.image}
                    />
                  </Anchor>
                </Paragraph>
              ) : null}
              <Heading2 className={styles.entry_title}>
                <Anchor
                  href={`/conferences/${entry.id}`}
                  className="no_underline"
                >
                  {entry.title}
                </Anchor>
              </Heading2>
              <Paragraph className={styles.entry_description}>
                {entry.description}
              </Paragraph>
              <Anchor href={`/conferences/${entry.id}`}>Lire la suite</Anchor>
              <div className={styles.clear}></div>
            </div>
          ))}
        </div>
        {!search ? (
          <nav className={styles.pagination}>
            {page > 1 ? (
              <Anchor
                icon="arrow-left"
                href={
                  page > 2 ? `/conferences/pages/${page - 1}` : '/conferences'
                }
                rel="previous"
              >
                Précédent
              </Anchor>
            ) : null}{' '}
            {page < pagesCount ? (
              <Anchor
                icon="arrow-right"
                iconPosition="last"
                href={`/conferences/pages/${page + 1}`}
                rel="next"
              >
                Suivant
              </Anchor>
            ) : null}
          </nav>
        ) : null}
      </ContentBlock>
    </Layout>
  );
};

export const entriesToBaseProps = (
  baseEntries: FrontMatterResult<Metadata>[]
): BaseProps => {
  const title = `Conférences`;
  const description = 'Découvrez le résumé de nos rencontres précédentes.';
  const entries = baseEntries
    .map<Entry>((entry) => ({
      ...entry.attributes,
      id: entry.attributes.leafname || toASCIIString(entry.attributes.title),
      content: parseMarkdown(entry.body) as MarkdownRootNode,
    }))
    .filter((entry) => !entry.draft || process.env.NODE_ENV === 'development')
    .sort(
      ({ date: dateA }: { date: string }, { date: dateB }: { date: string }) =>
        Date.parse(dateA) > Date.parse(dateB) ? -1 : 1
    );

  return {
    title,
    description,
    entries,
    pagesCount: Math.ceil(entries.length / POSTS_PER_PAGE),
  };
};

export const getStaticProps: GetStaticProps<Props, { page: string }> = async ({
  params,
}) => {
  const castedParams = readParams(PARAMS_DEFINITIONS, params || {}) as Params;
  const page = castedParams?.page || 1;
  const baseProps = entriesToBaseProps(
    await readEntries<Metadata>(pathJoin('.', 'contents', 'conferences'))
  );
  const title = `${baseProps.title}${
    page && page !== 1 ? ` - page ${page}` : ''
  }`;
  const entries = baseProps.entries.slice(
    (page - 1) * POSTS_PER_PAGE,
    (page - 1) * POSTS_PER_PAGE + POSTS_PER_PAGE
  );

  // WARNING: This is not a nice way to generate the search index
  // but having scripts run in the NextJS build context is a real
  // pain
  await buildSearchIndex(baseProps);

  return {
    props: {
      ...baseProps,
      title,
      entries,
      page,
    } as Props,
  };
};

export default BlogEntries;
