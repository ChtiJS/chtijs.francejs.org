import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { publicRuntimeConfig } from "../utils/config";
import {
  CSS_BREAKPOINT_END_M,
  CSS_BREAKPOINT_END_S,
  CSS_BREAKPOINT_START_L,
  CSS_BREAKPOINT_START_M,
  CSS_BREAKPOINT_START_XL,
} from "../utils/constants";
import Heading2 from "./h2";
import Paragraph from "./p";

const Menu = () => {
  const router = useRouter();

  return (
    <div className="root">
      <nav>
        <Link legacyBehavior href="/">
          <a
            className={`home ${router.asPath === "/" ? "selected" : ""}`}
            title="Revenir à l’accueil"
          >
            <span>Accueil</span>
          </a>
        </Link>
        <Link legacyBehavior href="/credits">
          <a
            className={router.asPath.startsWith("/credits") ? "selected" : ""}
            title="Les contributeurs du site"
          >
            <span>Crédits</span>
          </a>
        </Link>
        <Link legacyBehavior href="/membres">
          <a
            className={router.asPath === "/membres" ? "selected" : ""}
            title="Les membres du groupe"
          >
            <span>Membres</span>
          </a>
        </Link>
        <Link legacyBehavior href="/planete">
          <a
            className={router.asPath === "/planete" ? "selected" : ""}
            title="Voir les actus de nos membres"
          >
            <span>Planète</span>
          </a>
        </Link>
        <Link legacyBehavior href="/conference">
          <a
            className={router.asPath === "/conference" ? "selected" : ""}
            title="Voir les conférences"
          >
            <span>Conférences</span>
          </a>
        </Link>
        <Link legacyBehavior href="/a_propos">
          <a
            className={router.asPath === "/a_propos" ? "selected" : ""}
            title="En savoir plus sur nos habitudes"
          >
            <span>A propos</span>
          </a>
        </Link>
      </nav>
      <style jsx>{`
        .root {
          background-color: var(--primary);
        }
        nav {
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }
        nav a,
        nav a:visited {
          display: block;
          color: var(--light);
          font-size: var(--bigFontSize);
          line-height: var(--bigLineHeight);
          text-decoration: none;
          transition: background-color var(--baseAnimationRate),
            color var(--baseAnimationRate);
        }
        nav a:hover {
          color: var(--primary);
          background-color: var(--light);
          text-decoration: underline;
        }
        nav a.selected {
          text-decoration: underline;
          color: var(--secondary-darker);
        }
        nav a.newsletter {
          background-color: var(--quaternary);
          color: var(--light);
        }
        nav span {
          display: block;
          padding: calc(var(--vRythm) / 2) var(--gutter);
        }
        @media screen and (max-width: ${CSS_BREAKPOINT_END_S}) {
          nav {
            width: 100%;
          }
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_M}) and (max-width: ${CSS_BREAKPOINT_END_M}) {
          nav {
            width: calc(calc(var(--block) * 2) + calc(var(--gutter) * 3));
          }
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_L}) {
          nav {
            flex-direction: row;
            width: calc(calc(var(--block) * 3) + calc(var(--gutter) * 4));
          }
          .newsletter span {
            width: calc(var(--vRythm));
            background: var(--light);
            mask-repeat: no-repeat;
            mask-position: center center;
            mask-size: calc(var(--vRythm));
            mask-image: url("${publicRuntimeConfig.buildPrefix}/images/icons/mail.svg");
          }
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_XL}) {
          nav {
            width: calc(calc(var(--block) * 4) + calc(var(--gutter) * 5));
          }
        }
      `}</style>
    </div>
  );
};

export default Menu;
