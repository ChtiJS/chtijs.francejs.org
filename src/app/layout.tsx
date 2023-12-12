import '../styles/globals.css';
import styles from './layout.module.scss';
import React from 'react';
import Menu from '../components/menu';
import Header from '../components/header';
import Footer from '../components/footer';
import { ORGANISATION_PRIMARY_COLOR } from '../utils/constants';
import type { Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: ORGANISATION_PRIMARY_COLOR,
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <div className={styles.root}>
          <Menu />
          <Header />
          <div className={styles.contents}>{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
