import styles from './h5.module.scss';
const Heading5 = ({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLElement>) => (
  <h5 className={`${styles.root}$`} {...props}>
    {children}
    
  </h5>
);

export default Heading5;
