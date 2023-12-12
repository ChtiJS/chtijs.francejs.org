import styles from './ol.module.scss';
const OrderedList = ({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.OlHTMLAttributes<HTMLOListElement>) => (
  <ol className={styles.root} {...props}>
    {children}
  </ol>
);

export default OrderedList;
