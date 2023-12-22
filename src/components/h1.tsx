import styles from './h1.module.scss';

const Heading1 = ({
  children,
  className,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLElement>) => (
  <h1
    className={`${styles.root}${className ? ' ' + className : ''}`}
    {...props}
  >
    {children}
  </h1>
);

export default Heading1;
