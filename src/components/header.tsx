import Link from 'next/link';
import { publicRuntimeConfig } from '../utils/config';
import {
  CSS_BREAKPOINT_END_L,
  CSS_BREAKPOINT_END_M,
  CSS_BREAKPOINT_END_S,
  CSS_BREAKPOINT_START_L,
  CSS_BREAKPOINT_START_M,
  CSS_BREAKPOINT_START_XL,
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
          grid-column-start: 1;
          grid-column-end: 2;
          grid-row-start: 1;
          grid-row-end: 2;
          display: flex;
          flex-direction: column;
          background-color: var(--light);
          border-right: 1px solid var(--grey);
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
        /*
        @media screen and (max-width: ${CSS_BREAKPOINT_END_S}) {
          a {
            width: 100%;
          }
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_M}) and (max-width: ${CSS_BREAKPOINT_END_M}) {
          a {
            width: calc(calc(var(--block) * 2) + calc(var(--gutter) * 3));
          }
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_L}) and (max-width: ${CSS_BREAKPOINT_END_L}) {
          a {
            width: calc(calc(var(--block) * 3) + calc(var(--gutter) * 4));
          }
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_XL}) {
          a {
            width: calc(calc(var(--block) * 4) + calc(var(--gutter) * 5));
          }
        }*/
      `}</style>
    </>
  );
};

export default Header;
