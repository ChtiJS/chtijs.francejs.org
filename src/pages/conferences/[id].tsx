import { join as pathJoin } from 'path';
import { entriesToBaseProps } from './index';
import { readEntries } from '../../utils/frontmatter';
import Layout from '../../layouts/main';
import ContentBlock from '../../components/contentBlock';
import Paragraph from '../../components/p';
import Anchor from '../../components/a';
import styles from './id.module.scss';
import { fixText } from '../../utils/text';
import { renderMarkdown } from '../../utils/markdown';
import type { Metadata } from './index';
import type { Entry } from '.';
import type { GetStaticProps, GetStaticPaths } from 'next';

type Params = { id: string };
type Props = { entry: Entry };

const BlogPost = ({ entry }: Props) => {
  return (
    <Layout
      title={`${fixText(entry.title)}`}
      description={fixText(entry.description)}
      image={entry.illustration?.url}
    >
      <ContentBlock>
        {renderMarkdown({ index: 0 }, entry.content)}
        <Paragraph>
          Publié le{' '}
          {new Date(entry.date).toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
          .
        </Paragraph>
        <div className={styles.clear}></div>
        <Paragraph>
          <Anchor href="/conferences">Retour</Anchor>
        </Paragraph>
      </ContentBlock>
    </Layout>
  );
};

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => {
  const baseProps = entriesToBaseProps(
    await readEntries<Metadata>(pathJoin('.', 'contents', 'conferences'))
  );

  const paths = baseProps.entries.map((entry) => ({
    params: { id: entry.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const baseProps = entriesToBaseProps(
    await readEntries<Metadata>(pathJoin('.', 'contents', 'conferences'))
  );

  return {
    props: {
      entry: baseProps.entries.find(
        ({ id }) => id === (params || {}).id
      ) as Entry,
    },
  };
};
