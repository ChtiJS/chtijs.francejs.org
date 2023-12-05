import Heading2 from './h2';
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
  <aside className="root">
        <Heading2>Derniers messages Mastodon&nbsp;:</Heading2>
        <div className="tootList">
          {toots.map((toot) => (
            <div key={toot.id} className="toot">
              {renderMarkdown({ index: 0 }, toot.text)}
              <Paragraph>
                Publié le{" "}
                <Anchor href={toot.url}>
                  {new Date(toot.createdAt).toLocaleString()}.
                </Anchor>
              </Paragraph>
            </div>
          ))}
        </div>
    <style jsx>{`
      .root {
        margin: 0 0 var(--vRythm) 0;
      }
      .toot :global(a) {
        color: #205370;
      }
      .toot :global(p) {
        margin-left: 2%;
      }
      .toot :global(a):hover {
        color: #14171a;
      }

      .tootList {
        margin-top: var(--vRythm);
        display: flex;
        flex-direction: row;
        gap: var(--gutter);
      }
      .toot {
        border-style: solid;
        border-color: var(--grey);
        border-size: var(--borderSize);
        border-radius: var(--borderRadius);
        width: var(--block);
        padding: calc(var(--vRythm) / 2) calc(var(--gutter) / 2);
      }
    `}</style>
  </aside>
);

export default TootList;