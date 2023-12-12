import styles from './ul.module.scss';
const UnorderedList = ({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLUListElement>) => (
  <ul className={styles.root} {...props}>
    {children}
  </ul>
);

export default UnorderedList;
