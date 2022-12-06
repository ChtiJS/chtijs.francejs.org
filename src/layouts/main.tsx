import React from 'react';
import {
  CSS_BREAKPOINT_END_S,
  CSS_BREAKPOINT_START_M,
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
        <div className="wrapper">{children}</div>
        <Footer />
      </div>
      <style jsx>{`
        .root {
          min-height: 100vh;
          display: grid;
          grid-template-columns: var(--block) 1fr;
          grid-template-rows:
            calc(var(--vRythm) * 8) auto
            auto minmax(calc(var(--vRythm) * 2), auto);
          background: var(--tertiary);
        }
        .contents {
          overflow: auto;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          align-content: flex-end;
          background: var(--light);
        }
        .contents :first-child {
          flex: 1;
        }
        @media screen and (max-width: ${CSS_BREAKPOINT_END_S}) {
          .contents {
            grid-column-start: 1;
            grid-column-end: 3;
            grid-row-start: 3;
            grid-row-end: 4;
          }
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_M}) {
          .root {
            height: 100vh;
          }
          .contents {
            grid-column-start: 2;
            grid-column-end: 3;
            grid-row-start: 1;
            grid-row-end: 4;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
