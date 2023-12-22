import Heading2 from './h2';
import styles from './tootList.module.scss';
import { renderMarkdown } from '../utils/markdown';
import Paragraph from './p';
import Anchor from './a';
import type { MarkdownRootNode } from '../utils/markdown';

export type Toots = {
  id: string;
  text: MarkdownRootNode;
  createdAt: string;
  url: string;
}[];

const TootList = ({ toots }: { toots: Toots }) => (
  <aside className={styles.root}>
    <Heading2>Derniers messages Mastodon&nbsp;:</Heading2>
    <div className={styles.tootList}>
      {toots.map((toot) => (
        <div key={toot.id} className={styles.toot}>
          {renderMarkdown({ index: 0 }, toot.text)}
          <Paragraph>
            Publié le{' '}
            <Anchor href={toot.url} title="Voir le toot sur Mastodon">
              {new Date(toot.createdAt).toLocaleString()}.
            </Anchor>
          </Paragraph>
        </div>
      ))}
    </div>
  </aside>
);

export default TootList;
