import styles from './h3.module.scss';
const Heading3 = ({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLElement>) => (
  <h3 className={styles.root} {...props}>
    {children}
  </h3>
);

export default Heading3;
