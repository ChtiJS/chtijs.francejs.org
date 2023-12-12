import { join as pathJoin } from 'path';
import BlogEntries, { entriesToBaseProps, generateMetadata } from '../../page';
import { readEntries } from '../../../../utils/frontmatter';
import { buildAssets } from '../../../../utils/build';
import type { Metadata } from '../../page';

export { generateMetadata };
export default BlogEntries;

export async function generateStaticParams() {
  const baseProps = entriesToBaseProps(
    await readEntries<Metadata>(pathJoin('.', 'contents', 'conferences'))
  );

  // WARNING: This is not a nice way to generate the news feeds
  // but having scripts run in the NextJS build context is a real
  // pain
  await buildAssets(baseProps);

  const paths = new Array(baseProps.pagesCount)
    .fill('')
    .map((_, index) => index + 1)
    .filter((page) => page !== 1)
    .map((page) => ({ page: page.toString() }));

  return paths;
}
