import styles from './article.module.scss';
const Article = ({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) => (
  <article className={styles.root} {...props}>
    {children}
  </article>
);

export default Article;
