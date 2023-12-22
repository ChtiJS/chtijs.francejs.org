import { join as pathJoin } from 'path';
import { readEntries } from '../../utils/frontmatter';
import { readParams } from '../../utils/params';
import { Entries } from './entries';
import buildMetadata from '../../utils/metadata';
import { entriesToBaseListingMetadata } from '../../utils/conference';
import type { MarkdownRootNode } from '../../utils/markdown';
import type { BuildQueryParamsType } from '../../utils/params';
import { slicePage } from '../../utils/pagination';
import { POSTS_PER_PAGE } from '../../utils/conference';

export async function generateMetadata({
  params,
}: {
  params?: { page: string };
}) {
  const page = params?.page || 1;
  const title = `Conférences${page && page !== 1 ? ` - page ${page}` : ''}`;
  const description = 'Découvrez le résumé de nos rencontres précédentes.';

  const metadata = await buildMetadata({
    pathname: `/conferences${page && page !== 1 ? `/pages/${page}` : ''}`,
    title,
    description,
  });

  return {
    ...metadata,
    alternates: {
      ...(metadata.alternates || {}),
      types: {
        ...(metadata.alternates?.types || {}),
        'application/rss+xml': [
          { url: '/conferences.rss', title: `${title} (RSS)` },
        ],
        'application/atom+xml': [
          { url: '/conferences.atom', title: `${title} (Atom)` },
        ],
      },
    },
  };
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

export default async function BlogEntries({
  params,
}: {
  params: { page: string };
}) {
  const castedParams = readParams(PARAMS_DEFINITIONS, params || {}) as Params;
  const page = castedParams?.page || 1;
  const baseListingMetadata = entriesToBaseListingMetadata(
    await readEntries<Metadata>(pathJoin('.', 'contents', 'conferences'))
  );
  const entries = slicePage(baseListingMetadata.entries, page, POSTS_PER_PAGE);

  return (
    <Entries
      entries={entries}
      pagesCount={baseListingMetadata.pagesCount}
      page={page}
    />
  );
}
