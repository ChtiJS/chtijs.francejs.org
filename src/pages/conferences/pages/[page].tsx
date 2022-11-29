import { join as pathJoin } from 'path';
import BlogEntries, { entriesToBaseProps, getStaticProps } from '../index';
import { readEntries } from '../../../utils/frontmatter';
import type { GetStaticPaths } from 'next';
import type { Metadata } from '../index';

export { getStaticProps };
export default BlogEntries;

export const getStaticPaths: GetStaticPaths = async () => {
  const baseProps = entriesToBaseProps(
    await readEntries<Metadata>(pathJoin('.', 'contents', 'conferences'))
  );

  const paths = new Array(baseProps.pagesCount)
    .fill('')
    .map((_, index) => index + 1)
    .filter((page) => page !== 1)
    .map((page) => ({
      params: { page: page.toString() },
    }));

  return { paths, fallback: false };
};
