import { join as pathJoin } from 'path';
import { readEntries } from '../../utils/frontmatter';
import { toASCIIString } from '../../utils/ascii';
import { readParams } from '../../utils/params';
import { parseMarkdown } from '../../utils/markdown';
import { buildSearchIndex } from '../../utils/search';
import { Entries } from './entries';
import buildMetadata from '../../utils/metadata';
import type { FrontMatterResult } from 'front-matter';
import type { MarkdownRootNode } from '../../utils/markdown';
import type { BuildQueryParamsType } from '../../utils/params';

export async function generateMetadata({
  params,
}: {
  params: { page: string };
}) {
  const page = params?.page || 1;
  const title = `Conférences${page && page !== 1 ? ` - page ${page}` : ''}`;
  const description = 'Découvrez le résumé de nos rencontres précédentes.';

  return buildMetadata({
    pathname: '/',
    title,
    description,
  });
}

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

export default async function BlogEntries({
  params,
}: {
  params: { page: string };
}) {
  const castedParams = readParams(PARAMS_DEFINITIONS, params || {}) as Params;
  const page = castedParams?.page || 1;
  const baseProps = entriesToBaseProps(
    await readEntries<Metadata>(pathJoin('.', 'contents', 'conferences'))
  );
  const entries = baseProps.entries.slice(
    (page - 1) * POSTS_PER_PAGE,
    (page - 1) * POSTS_PER_PAGE + POSTS_PER_PAGE
  );
  const pagesCount = Math.ceil(baseProps.entries.length / POSTS_PER_PAGE);

  // WARNING: This is not a nice way to generate the search index
  // but having scripts run in the NextJS build context is a real
  // pain
  await buildSearchIndex(baseProps);

  return <Entries entries={entries} pagesCount={pagesCount} page={page} />;
}

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
