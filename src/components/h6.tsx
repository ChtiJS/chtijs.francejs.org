import styles from './h5.module.scss';
const Heading6 = ({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLElement>) => (
  <h6 className={`${styles.root}$`} {...props}>
    {children}
  </h6>
);

export default Heading6;
