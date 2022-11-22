import Link from 'next/link';
import Social from './social';
import {
  CSS_BREAKPOINT_END_L,
  CSS_BREAKPOINT_END_M,
  CSS_BREAKPOINT_END_S,
  CSS_BREAKPOINT_START_L,
  CSS_BREAKPOINT_START_M,
  CSS_BREAKPOINT_START_XL,
  ORGANISATION_NAME,
} from '../utils/constants';

const Footer = () => {
  return (
    <>
      <footer>
        <p>
          <span>© {ORGANISATION_NAME} - Tous droits réservés</span> -{' '}
          <Link href="/mentions-legales" legacyBehavior>
            <a>Mentions légales</a>
          </Link>
        </p>
      </footer>
      <style jsx>{`
        footer {
          display: flex;
          flex-direction: row;
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

        /*
        @media screen and (max-width: ${CSS_BREAKPOINT_END_S}) {
          footer {
            width: 100%;
          }
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_M}) and (max-width: ${CSS_BREAKPOINT_END_M}) {
          footer {
            width: calc(calc(var(--block) * 2) + calc(var(--gutter) * 3));
          }
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_L}) and (max-width: ${CSS_BREAKPOINT_END_L}) {
          footer {
            width: calc(calc(var(--block) * 3) + calc(var(--gutter) * 4));
          }
          .bottom {
            display: flex;
            justify-content: center;
          }
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_XL}) {
          .contents {
            width: calc(calc(var(--block) * 4) + calc(var(--gutter) * 5));
          }
        }*/
      `}</style>
    </>
  );
};

export default Footer;
