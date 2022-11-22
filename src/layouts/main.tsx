import React from "react";
import {
  CSS_BREAKPOINT_END_L,
  CSS_BREAKPOINT_END_M,
  CSS_BREAKPOINT_END_S,
  CSS_BREAKPOINT_START_L,
  CSS_BREAKPOINT_START_M,
  CSS_BREAKPOINT_START_XL,
  ORGANISATION_NAME,
} from "../utils/constants";
import Meta from "../components/meta";
import Menu from "../components/menu";
import Header from "../components/header";
import Footer from "../components/footer";
import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  title: string;
  description?: string;
  image?: string;
};

const Layout = ({ children, title, description = "", image = "" }: Props) => {
  return (
    <div className="root">
      <Meta
        name={ORGANISATION_NAME}
        title={title}
        description={description}
        image={image}
      />
      <Menu />
      <Header />
      <div className="contents">{children}</div>
      <Footer />
      <style jsx>{`
        .root {
          min-height: 100%;
          display: flex;
          flex-direction: column;
          background: var(--tertiary);
        }
        .contents {
          flex-grow: 1;
          margin: 0 auto var(--vRythm) auto;
        }
        @media screen and (max-width: ${CSS_BREAKPOINT_END_S}) {
          .contents {
            background: yellow;
            width: 100%;
          }
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_M}) and (max-width: ${CSS_BREAKPOINT_END_M}) {
          .contents {
            background: blue;
            width: calc(calc(var(--block) * 2) + calc(var(--gutter) * 3));
          }
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_L}) and (max-width: ${CSS_BREAKPOINT_END_L}) {
          .contents {
            background: red;
            width: calc(calc(var(--block) * 3) + calc(var(--gutter) * 4));
          }
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_XL}) {
          .contents {
            background: green;
            width: calc(calc(var(--block) * 4) + calc(var(--gutter) * 5));
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
