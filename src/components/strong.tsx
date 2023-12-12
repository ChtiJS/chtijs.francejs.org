import React from 'react';
import styles from './strong.module.scss';

const Strong = ({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) => (
  <strong className={styles.root} {...props}>
    {children}
  </strong>
);

export default Strong;
