'use client';

import styles from './conferences.module.scss';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import lunr, { type Index } from 'lunr';
import ContentBlock from '../../components/contentBlock';
import Heading1 from '../../components/h1';
import Heading2 from '../../components/h2';
import Paragraph from '../../components/p';
import Anchor from '../../components/a';
import type { MarkdownRootNode } from '../../utils/markdown';

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

export type EntriesProps = {
  entries: Entry[];
  pagesCount: number;
  page: number;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const Entries = ({ entries, page, pagesCount }: EntriesProps) => {
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
    <ContentBlock className={styles.root}>
      <Heading1>Résumés des rencontres</Heading1>
      <Paragraph>
        Découvrez le résumé de chacune de nos rencontres ChtiJS.
      </Paragraph>
      {page === 1 ? (
        <Paragraph>
          <label>
            <span>Recherche :</span>
            <input
              type="search"
              placeholder="Rechercher une conference"
              value={search}
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
      <div>
        {(
          (search ? searchResults : entries) as Pick<
            Entry,
            'id' | 'title' | 'description' | 'illustration'
          >[]
        ).map((entry) => (
          <div className={styles.entry_item} key={entry.id}>
            {entry.illustration ? (
              <Paragraph className={styles.entry_illustration}>
                <Anchor
                  href={`/conferences/${entry.id}`}
                  title="Voir le résumé"
                >
                  <img
                    src={entry.illustration.url}
                    alt={entry.illustration.alt}
                  />
                </Anchor>
              </Paragraph>
            ) : null}
            <Heading2 className={styles.entry_title}>
              <Anchor href={`/conferences/${entry.id}`} title="Voir le résumé">
                {entry.title}
              </Anchor>
            </Heading2>
            <Paragraph className={styles.entry_title}>
              {entry.description}
            </Paragraph>
            <Anchor href={`/conferences/${entry.id}`} title="Voir le résumé">
              Lire la suite
            </Anchor>
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
              title="Voir la page précédente"
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
              title="Voir la page suivante"
            >
              Suivant
            </Anchor>
          ) : null}
        </nav>
      ) : null}
    </ContentBlock>
  );
};
