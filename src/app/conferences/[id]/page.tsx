import { join as pathJoin } from 'path';
import { readEntries } from '../../../utils/frontmatter';
import ContentBlock from '../../../components/contentBlock';
import Paragraph from '../../../components/p';
import Anchor from '../../../components/a';
import { fixText } from '../../../utils/text';
import { renderMarkdown } from '../../../utils/markdown';
import buildMetadata from '../../../utils/metadata';
import { entriesToBaseListingMetadata } from '../../../utils/conference';
import styles from './conference.module.scss';
import type { Metadata } from '../page';
import type { Entry } from '../page';

type Params = { id: string };

export async function generateMetadata({ params }: { params: Params }) {
  const baseListingMetadata = entriesToBaseListingMetadata(
    await readEntries<Metadata>(pathJoin('.', 'contents', 'conferences'))
  );
  const entry = baseListingMetadata.entries.find(
    ({ id }) => id === (params || {}).id
  ) as Entry;

  return buildMetadata({
    title: fixText(entry.title),
    description: fixText(entry.description),
    image: entry.illustration?.url,
    pathname: `/conferences/${params.id}`,
  });
}

export default async function BlogPost({ params }: { params: Params }) {
  const baseListingMetadata = entriesToBaseListingMetadata(
    await readEntries<Metadata>(pathJoin('.', 'contents', 'conferences'))
  );
  const entry = baseListingMetadata.entries.find(
    ({ id }) => id === (params || {}).id
  ) as Entry;

  return (
    <ContentBlock className={styles.root}>
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
        <Anchor href="/conferences" title="Retourner à la page précédente">
          Retour
        </Anchor>
      </Paragraph>
    </ContentBlock>
  );
}

export async function generateStaticParams() {
  const baseListingMetadata = entriesToBaseListingMetadata(
    await readEntries<Metadata>(pathJoin('.', 'contents', 'conferences'))
  );
  const paths = baseListingMetadata.entries.map((entry) => ({
    id: entry.id,
  }));

  return paths;
}
