'use client';

import Link from 'next/link';
import styles from './menu.module.scss';
import { usePathname } from 'next/navigation';

const Menu = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <Link
        href="/"
        className={`home ${pathname === '/' ? styles.selected : ''}`}
        title="Revenir à l’accueil"
      >
        <span>Accueil</span>
      </Link>
      <Link
        href="/credits"
        className={
          (pathname || '').startsWith('/credits') ? styles.selected : ''
        }
        title="Les contributeurs du site"
      >
        <span>Crédits</span>
      </Link>
      <Link
        href="/membres"
        className={pathname === '/membres' ? styles.selected : ''}
        title="Les membres du groupe"
      >
        <span>Membres</span>
      </Link>
      <Link
        href="/planete"
        className={pathname === '/planete' ? styles.selected : ''}
        title="Voir les actus de nos membres"
      >
        <span>Planète</span>
      </Link>
      <Link
        href="/conferences"
        className={pathname === '/conferences' ? styles.selected : ''}
        title="Voir les conférences"
      >
        <span>Conférences</span>
      </Link>
      <Link
        href="/about"
        className={pathname === '/about' ? styles.selected : ''}
        title="En savoir plus sur nos habitudes"
      >
        <span>A propos</span>
      </Link>
    </nav>
  );
};

export default Menu;
