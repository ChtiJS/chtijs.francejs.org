import '../styles/globals.scss';
import styles from './layout.module.scss';
import { StrictMode, type ReactNode } from 'react';
import { ORGANISATION_PRIMARY_COLOR } from '../utils/constants';
import Menu from '../components/menu';
import Header from '../components/header';
import Footer from '../components/footer';
import GridSystem from '../components/_gridSystem';
import type { Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: ORGANISATION_PRIMARY_COLOR,
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body
        className={
          process.env.NODE_ENV === 'development' ? 'showScreenSizes' : ''
        }
      >
        {process.env.NODE_ENV === 'development' ? <GridSystem /> : null}
        {process.env.NODE_ENV === 'development' ? (
          <StrictMode>
            <div className={styles.root}>
              <Menu />
              <Header />
              <div className={styles.contents}>{children}</div>
              <Footer />
            </div>
          </StrictMode>
        ) : (
          <div className={styles.root}>
            <Menu />
            <Header />
            <div className={styles.contents}>{children}</div>
            <Footer />
          </div>
        )}
      </body>
    </html>
  );
}
