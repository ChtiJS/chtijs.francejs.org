import styles from './p.module.scss';
const Paragraph = ({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={`${styles.root}$`} {...props}>
    {children}
  </p>
);

export default Paragraph;
