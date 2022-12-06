import Link from 'next/link';
import {
  CSS_BREAKPOINT_END_S,
  CSS_BREAKPOINT_START_M,
  ORGANISATION_NAME,
} from '../utils/constants';

const Footer = () => {
  return (
    <>
      <footer>
        <p>
          © {ORGANISATION_NAME} - Tous droits réservés -{' '}
          <Link href="/mentions-legales" legacyBehavior>
            <a>Mentions légales</a>
          </Link>
        </p>
      </footer>
      <style jsx>{`
        footer {
          display: block;
          width: 100%;
          background-color: var(--dark);
        }
        p {
          color: var(--light);
          margin: 0 auto;
          text-align: center;
          line-height: calc(var(--vRythm) * 2);
        }
        a,
        a:visited,
        a:hover {
          color: var(--light);
        }
        @media screen and (max-width: ${CSS_BREAKPOINT_END_S}) {
          footer {
            grid-column-start: 1;
            grid-column-end: 3;
            grid-row-start: 4;
            grid-row-end: 5;
          }
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_M}) {
          footer {
            grid-column-start: 1;
            grid-column-end: 3;
            grid-row-start: 4;
            grid-row-end: 5;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;
