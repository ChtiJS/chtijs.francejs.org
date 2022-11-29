import { join as pathJoin } from 'path';
import Layout from '../../layouts/main';
import ContentBlock from '../../components/contentBlock';
import Heading1 from '../../components/h1';
import Heading2 from '../../components/h2';
import Paragraph from '../../components/p';
import Anchor from '../../components/a';
import { readEntries } from '../../utils/frontmatter';
import { toASCIIString } from '../../utils/ascii';
import { CSS_BREAKPOINT_START_L } from '../../utils/constants';
import { readParams } from '../../utils/params';
import { parseMarkdown } from '../../utils/markdown';
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
  location: string
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

const BlogEntries = ({
  title,
  description,
  entries,
  page,
  pagesCount,
}: Props) => (
  <Layout title={title} description={description}>
    <ContentBlock className="title">
      <Heading1 className="title">Résumés des rencontres</Heading1>
      <Paragraph>.</Paragraph>

      <div className="entries">
        {entries.map((entry) => (
          <div className="entry_item" key={entry.id}>
            {entry.illustration ? (
              <Paragraph className="entry_illustration">
                <Anchor href={`/conferences/${entry.id}`}>
                  <img
                    src={'/' + entry.illustration.url}
                    alt={entry.illustration.alt}
                  />
                </Anchor>
              </Paragraph>
            ) : null}
            <Heading2 className="entry_title">
              <Anchor
                href={`/conferences/${entry.id}`}
                className="no_underline"
              >
                {entry.title}
              </Anchor>
            </Heading2>
            <Paragraph className="entry_description">
              {entry.description}
            </Paragraph>
            <Anchor href={`/conferences/${entry.id}`}>Lire la suite</Anchor>
            <div className="clear"></div>
          </div>
        ))}
      </div>
      <nav className="pagination">
        {page > 1 ? (
          <Anchor
            icon="arrow-left"
            href={page > 2 ? `/conferences/pages/${page - 1}` : '/conferences'}
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
    </ContentBlock>
    <style jsx>{`
      :global(.entry_title) {
        margin-top: 0 !important;
      }
      :global(.entry_title a) {
        text-decoration: none !important;
      }
      :global(.entry_illustration) {
        margin: 0 !important;
      }
      :global(.entry_description) {
        margin: 0 !important;
      }
      .entry_item {
        padding: var(--vRythm) 0;
        border-bottom: var(--border) solid var(--dark);
      }
      .entry_item:first-child {
        padding: 0 0 var(--vRythm) 0;
      }
      .entry_item:last-child {
        border: none;
        padding: var(--vRythm) 0 0 0;
      }
      .pagination {
        display: flex;
        gap: var(--gutter);
        align-items: center;
        justify-content: center;
        padding: var(--vRythm) 0 0 0;
      }
      img {
        width: 100%;
      }

      @media screen and (min-width: ${CSS_BREAKPOINT_START_L}) {
        img {
          float: left;
          width: var(--block);
          margin-right: var(--gutter);
        }
        .clear {
          clear: left;
        }
      }
    `}</style>
  </Layout>
);

export const entriesToBaseProps = (
  baseEntries: FrontMatterResult<Metadata>[]
): BaseProps => {
  const title = `Conférences`;
  const description = "Découvrez le résumé de nos rencontres précédentes.";
  const entries = baseEntries
    .map<Entry>((entry) => ({
      ...entry.attributes,
      id: entry.attributes.leafname || toASCIIString(entry.attributes.title),
      content: parseMarkdown(entry.body) as MarkdownRootNode,
    }))
    .filter((entry) => !entry.draft || process.env.NODE_ENV === 'development')
    .sort(({ date: dateA }: any, { date: dateB }: any) =>
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
