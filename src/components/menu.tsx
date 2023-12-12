'use client';

import Link from 'next/link';
import styles from './menu.module.scss';
import { usePathname } from 'next/navigation';

const Menu = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <Link legacyBehavior href="/">
        <a
          className={`home ${pathname === '/' ? styles.selected : ''}`}
          title="Revenir à l'accueil"
        >
          <span>Accueil</span>
        </a>
      </Link>
      <Link legacyBehavior href="/credits">
        <a
          className={
            (pathname || '').startsWith('/credits') ? styles.selected : ''
          }
          title="Les contributeurs du site"
        >
          <span>Crédits</span>
        </a>
      </Link>
      <Link legacyBehavior href="/membres">
        <a
          className={pathname === '/membres' ? styles.selected : ''}
          title="Les membres du groupe"
        >
          <span>Membres</span>
        </a>
      </Link>
      <Link legacyBehavior href="/planete">
        <a
          className={pathname === '/planete' ? styles.selected : ''}
          title="Voir les actus de nos membres"
        >
          <span>Planète</span>
        </a>
      </Link>
      <Link legacyBehavior href="/conferences">
        <a
          className={pathname === '/conferences' ? styles.selected : ''}
          title="Voir les conférences"
        >
          <span>Conférences</span>
        </a>
      </Link>
      <Link legacyBehavior href="/about">
        <a
          className={pathname === '/about' ? styles.selected : ''}
          title="En savoir plus sur nos habitudes"
        >
          <span>A propos</span>
        </a>
      </Link>
    </nav>
  );
};

export default Menu;
