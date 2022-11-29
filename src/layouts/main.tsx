import React from 'react';
import {
  CSS_BREAKPOINT_END_L,
  CSS_BREAKPOINT_END_M,
  CSS_BREAKPOINT_END_S,
  CSS_BREAKPOINT_START_L,
  CSS_BREAKPOINT_START_M,
  CSS_BREAKPOINT_START_XL,
  ORGANISATION_NAME,
} from '../utils/constants';
import Meta from '../components/meta';
import Menu from '../components/menu';
import Header from '../components/header';
import Footer from '../components/footer';
import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  title: string;
  description?: string;
  image?: string;
};

const Layout = ({ children, title, description = '', image = '' }: Props) => {
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
      <div className="contents">
        <div className="wrapper">
          {children}
        </div>
        <Footer />
      </div>
      <style jsx>{`
        .root {
          height: 100vh;
          display: grid;
          grid-template-columns: var(--block) 1fr;
          grid-template-rows: calc(var(--vRythm) * 8) 1fr;
          background: var(--tertiary);
        }
        .contents {
          grid-column-start: 2;
          grid-column-end: 3;
          grid-row-start: 1;
          grid-row-end: 3;
          overflow: auto;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          align-content: flex-end;
          background: var(--light);
        }
        .contents :first-child {
          flex:1;
        }
        /*
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
          .h1 {
            color: #f2c80a;
          }
          .contents {
            background: #ede5c2;
            width: calc(calc(var(--block) * 4) + calc(var(--gutter) * 5));
          }
        }*/
      `}</style>
    </div>
  );
};

export default Layout;
