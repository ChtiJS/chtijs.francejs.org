import React from 'react';
import styles from './em.module.scss';

const Emphasis = ({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) => (
  <em className={styles.root} {...props}>
    {children}
  </em>
);

export default Emphasis;
