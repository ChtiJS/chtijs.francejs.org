import styles from './h2.module.scss';
const Heading2 = ({
  children,
  className,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLElement>) => (
  <h2 className={`${styles.root}${className ? ' ' + className : ''}`} {...props}>
    {children}
    
  </h2>
);

export default Heading2;
