import Link from "next/link";
import Social from "./social";
import {
  CSS_BREAKPOINT_END_L,
  CSS_BREAKPOINT_END_M,
  CSS_BREAKPOINT_END_S,
  CSS_BREAKPOINT_START_L,
  CSS_BREAKPOINT_START_M,
  CSS_BREAKPOINT_START_XL,
  ORGANISATION_NAME,
} from "../utils/constants";

const Footer = () => {
  return (
    <div className="root">
      <footer>
        <div className="bottom">
          <p>
            <span>© {ORGANISATION_NAME} - Tous droits réservés</span> -{" "}
            <Link href="/mentions-legales" legacyBehavior>
              <a>Mentions légales</a>
            </Link>
          </p>
          <Social />
        </div>
      </footer>
      <style jsx>{`
        .root {
          margin: 0;
          padding: var(--vRythm) var(--gutter);
          background-color: var(--primary);
          color: var(--light);
        }

        footer {
          margin: 0 auto;
          text-align: center;
        }
        p {
          padding: 0;
          margin: 0;
        }
        a,
        a:visited,
        a:hover {
          color: var(--light);
        }
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
        }
      `}</style>
    </div>
  );
};

export default Footer;
