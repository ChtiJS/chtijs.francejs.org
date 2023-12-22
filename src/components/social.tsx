import {
  TWITTER_ACCOUNT,
  MASTODON_SERVER,
  MASTODON_ACCOUNT,
} from '../utils/constants';
import styles from './social.module.scss';

export default function Social(): JSX.Element {
  return (
    <nav className={styles.root}>
      <ul>
        <li className={`${styles.twitter}`}>
          <a
            href={`https://twitter.com/${TWITTER_ACCOUNT}`}
            title="Suivre notre groupe sur Twitter"
            target="_blank"
            rel="noreferrer"
          >
            <span>Twitter</span>
          </a>
        </li>
        <li className={styles.mastodon}>
          <a
            href={`https://${MASTODON_SERVER}/@${MASTODON_ACCOUNT}`}
            title="Suivre notre groupe sur Mastodon"
            target="_blank"
            rel="noreferrer"
          >
            <span>Mastodon</span>
          </a>
        </li>
        <li className={styles.feed}>
          <a
            href="/blog.atom"
            title="S’abonner aux mises à jour"
            target="_blank"
          >
            <span>Flux de syndication</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
