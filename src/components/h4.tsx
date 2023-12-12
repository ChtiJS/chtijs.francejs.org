import styles from './h4.module.scss';
const Heading4 = ({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLElement>) => (
  <h4 className={styles.root} {...props}>
    {children}
    
  </h4>
);

export default Heading4;
