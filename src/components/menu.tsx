import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  CSS_BREAKPOINT_END_S,
  CSS_BREAKPOINT_START_M,
} from '../utils/constants';

const Menu = () => {
  const router = useRouter();

  return (
    <>
      <nav>
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
      <style jsx>{`
        nav {
          background-color: var(--light);
          display: flex;
          flex-direction: column;
        }
        nav a,
        nav a:visited {
          display: block;
          color: var(--dark);
          font-size: var(--bigFontSize);
          line-height: var(--bigLineHeight);
          text-decoration: none;
          transition: background-color var(--baseAnimationRate),
            color var(--baseAnimationRate);
        }
        nav a.selected {
          text-decoration: underline;
          color: var(--light);
          background-color: var(--grey);
        }
        nav a:hover,
        nav a.selected:hover {
          color: var(--light);
          background-color: var(--primary);
          text-decoration: underline;
        }
        nav span {
          display: block;
          padding: calc(var(--vRythm) / 2) var(--gutter);
        }

        @media screen and (max-width: ${CSS_BREAKPOINT_END_S}) {
          nav {
            grid-column-start: 1;
            grid-column-end: 3;
            grid-row-start: 2;
            grid-row-end: 3;
          }
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_M}) {
          nav {
            grid-column-start: 1;
            grid-column-end: 2;
            grid-row-start: 2;
            grid-row-end: 4;
            border-right: 1px solid var(--grey);
          }
        }
      `}</style>
    </>
  );
};

export default Menu;
