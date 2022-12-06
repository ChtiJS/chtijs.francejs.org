import Link from 'next/link';
import { publicRuntimeConfig } from '../utils/config';
import {
  CSS_BREAKPOINT_END_S,
  CSS_BREAKPOINT_START_M,
} from '../utils/constants';

const Header = () => {
  return (
    <>
      <header>
        <h1>
          <Link href="/" legacyBehavior>
            <a>
              <span>ChtiJS</span>
            </a>
          </Link>
        </h1>
      </header>
      <style jsx>{`
        header {
          display: flex;
          flex-direction: column;
          background-color: var(--light);
        }
        h1 {
          display: block;
          margin: 0 auto;
          width: calc(var(--vRythm) * 8);
          height: calc(var(--vRythm) * 8);
        }
        a {
          display: block;
          width: calc(var(--vRythm) * 8);
          height: calc(var(--vRythm) * 8);
          background-image: url('${publicRuntimeConfig.buildPrefix}/images/chtijs.svg');
          background-size: contain;
          background-repeat: no-repeat;
        }
        span {
          display: none;
        }
        @media screen and (max-width: ${CSS_BREAKPOINT_END_S}) {
          header {
            grid-column-start: 1;
            grid-column-end: 3;
            grid-row-start: 1;
            grid-row-end: 2;
          }
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_M}) {
          header {
            grid-column-start: 1;
            grid-column-end: 2;
            grid-row-start: 1;
            grid-row-end: 2;
            border-right: 1px solid var(--grey);
          }
        }
      `}</style>
    </>
  );
};

export default Header;
