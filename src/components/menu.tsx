import Link from 'next/link';
import styles from './menu.module.scss';
import { useRouter } from 'next/router';

const Menu = () => {
  const router = useRouter();

  return (
    <>
      <nav className={styles.nav}>
        <Link legacyBehavior href="/">
          <a
            className={`home ${router.asPath === '/' ? 'selected' : ''}`}
            title="Revenir à l’accueil"
          >
            <span>Accueil</span>
          </a>
        </Link>
        <Link legacyBehavior href="/credits">
          <a
            className={router.asPath.startsWith('/credits') ? 'selected' : ''}
            title="Les contributeurs du site"
          >
            <span>Crédits</span>
          </a>
        </Link>
        <Link legacyBehavior href="/membres">
          <a
            className={router.asPath === '/membres' ? 'selected' : ''}
            title="Les membres du groupe"
          >
            <span>Membres</span>
          </a>
        </Link>
        <Link legacyBehavior href="/planete">
          <a
            className={router.asPath === '/planete' ? 'selected' : ''}
            title="Voir les actus de nos membres"
          >
            <span>Planète</span>
          </a>
        </Link>
        <Link legacyBehavior href="/conferences">
          <a
            className={router.asPath === '/conferences' ? 'selected' : ''}
            title="Voir les conférences"
          >
            <span>Conférences</span>
          </a>
        </Link>
        <Link legacyBehavior href="/about">
          <a
            className={router.asPath === '/about' ? 'selected' : ''}
            title="En savoir plus sur nos habitudes"
          >
            <span>A propos</span>
          </a>
        </Link>
      </nav>
    </>
  );
};

export default Menu;
