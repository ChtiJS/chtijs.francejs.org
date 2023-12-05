import styles from './blockquote.module.scss';

const Blockquote = ({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.BlockquoteHTMLAttributes<HTMLElement>) => (
  <blockquote className={styles.root} {...props}>
    {children}
  </blockquote>
);

export default Blockquote;
