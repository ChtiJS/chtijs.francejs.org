import { join as pathJoin } from 'path';
import { entriesToBaseListingMetadata } from '../../../../utils/conference';
import BlogEntries, { generateMetadata } from '../../page';
import { readEntries } from '../../../../utils/frontmatter';
import { buildAssets } from '../../../../utils/build';
import { buildSearchIndex } from '../../../../utils/search';
import type { Metadata } from '../../page';

export { generateMetadata };
export default BlogEntries;

export async function generateStaticParams() {
  const baseListingMetadata = entriesToBaseListingMetadata(
    await readEntries<Metadata>(pathJoin('.', 'contents', 'conferences'))
  );
  const { title, description } = await generateMetadata({});

  // WARNING: This is not a nice way to generate the news feeds
  // but having scripts run in the NextJS build context is a real
  // pain
  await buildAssets(
    {
      ...baseListingMetadata,
      title: title as string,
      description: description as string,
    },
    '/conferences'
  );

  // WARNING: This is not a nice way to generate the search index
  // but having scripts run in the NextJS build context is a real
  // pain
  await buildSearchIndex({
    ...baseListingMetadata,
    title: title as string,
    description: description as string,
  });

  const paths = new Array(baseListingMetadata.pagesCount)
    .fill('')
    .map((_, index) => index + 1)
    .filter((page) => page !== 1)
    .map((page) => ({ page: page.toString() }));

  return paths;
}
