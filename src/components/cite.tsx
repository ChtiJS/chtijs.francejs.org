import React from 'react';
import styles from './cite.module.scss';


const Cite = ({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) => (
  <cite className={styles.root} {...props}>
    {children}
  </cite>
);

export default Cite;
