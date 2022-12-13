import Heading2 from '../components/h2';
import HorizontalRule from '../components/hr';
import { Client } from 'twitter-api-sdk';
import { parseMarkdown, renderMarkdown } from '../utils/markdown';
import type { MarkdownRootNode } from '../utils/markdown';
export type Tweets={
  id: string;
  content: MarkdownRootNode;
}[]


const TweetList = ({
  tweets
}:{tweets:Tweets}) => (
  <aside className="root">
    
    <Heading2>Nos derniers tweets </Heading2>
        <div className="tweetList">
        {tweets.map((tweet) => (
          <div className="tweet">
            {renderMarkdown({ index: 0 }, tweet.content)}
          </div>
        ))}
        </div>
    <style jsx>{`
      .root {
        margin: 0 0 var(--vRythm) 0;
      }
      .tweet :global(a) {
        color: #205370  ;
      }
      .tweet :global(p) {
        margin-left: 2%;
      }
      .tweet :global(a):hover {
        color: #14171A;
      }

      .tweetList{
        margin-top : var(--vRythm);
        display: flex;
        flex-direction: row;
        gap: var(--gutter);
      }
      .tweet{
        border-style: solid;
        border-color: var(--grey);
        border-size: var(--borderSize);
        border-radius: var(--borderRadius);
        width: var(--block);
        padding: calc(var(--vRythm)/2) calc(var(--gutter)/2);
      }
      `}</style>
  </aside>
);

export default TweetList; 