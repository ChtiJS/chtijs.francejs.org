import styles from './li.module.scss';
const ListItem = ({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.LiHTMLAttributes<HTMLLIElement>) => (
  <li className={styles.root} {...props}>
    {children}
  </li>
);

export default ListItem;
