import React from 'react';
import { ORGANISATION_NAME } from '../utils/constants';
import Meta from '../components/meta';
import Menu from '../components/menu';
import Header from '../components/header';
import Footer from '../components/footer';
import styles from './main.module.scss';
import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  title: string;
  description?: string;
  image?: string;
};

const Layout = ({ children, title, description = '', image = '' }: Props) => {
  return (
    <div className={styles.root}>
      <Meta
        name={ORGANISATION_NAME}
        title={title}
        description={description}
        image={image}
      />
      <Menu />
      <Header />
      <div className={styles.contents}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
