export type BaseContentPageMetadata = {
  id: string;
  leafname?: string;
  title: string;
  description: string;
  summary?: string;
  date: string;
  draft?: boolean;
  illustration?: {
    url: string;
    alt: string;
  };
};

export type BaseListingPageMetadata<T extends BaseContentPageMetadata> = {
  entries: T[];
  pagesCount: number;
};
export type BasePagingPageMetadata<T extends BaseContentPageMetadata> =
  BaseListingPageMetadata<T> & {
    page: number;
  };

export function datedPagesSorter<T extends { date: string }>(
  { date: dateA }: T,
  { date: dateB }: T
): number {
  return Date.parse(dateA) === Date.parse(dateB)
    ? 0
    : Date.parse(dateA) > Date.parse(dateB)
    ? -1
    : 1;
}

export function titledPagesSorter<T extends { title: string }>(
  { title: titleA }: T,
  { title: titleB }: T
): number {
  return titleA.localeCompare(titleB);
}
