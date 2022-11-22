import { TWITTER_ACCOUNT } from '../utils/constants';
import { publicRuntimeConfig } from '../utils/config';

export default function Social(): JSX.Element {
  return (
    <nav>
      <ul>
        <li className="twitter">
          <a
            href={`https://twitter.com/${TWITTER_ACCOUNT}`}
            title="Suivre notre groupe sur Twitter"
            target="_blank"
            rel="noreferrer"
          >
            <span>Twitter</span>
          </a>
        </li>
        <li className="feed">
          <a
            href="/blog.atom"
            title="S'abonner aux mises à jour"
            target="_blank"
          >
            <span>Flux de syncdication</span>
          </a>
        </li>
      </ul>
      <style jsx>{`
        nav {
          padding: 0 0 0 var(--gutter);
          margin: 0;
        }
        ul {
          display: flex;
          justify-content: center;
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        li {
          display: block;
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        a {
          display: block;
          width: var(--vRythm);
          height: var(--vRythm);
          background: var(--light);
          mask-repeat: no-repeat;
          mask-position: center bottom;
          mask-size: calc(var(--vRythm) * 1);
          -webkit-mask-size: calc(var(--vRythm) * 1);
          mask-image: url('${publicRuntimeConfig.buildPrefix}/images/icons/twitter.svg');
        }
        li.feed a {
          mask-image: url('${publicRuntimeConfig.buildPrefix}/images/icons/feed.svg');
        }
        span {
          display: none;
        }
      `}</style>
    </nav>
  );
}
