import React from 'react';
import styles from './code.module.scss';

const Code = ({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) => (
  <code className={styles.root} {...props}>
    {children}
  </code>
);

export default Code;
