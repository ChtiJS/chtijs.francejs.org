const Article = ({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) => (
  <article className="root" {...props}>
    {children}
    <style jsx>{`
      .root {
        padding: var(--vRythm) 0;
      }
      .root:not(:last-child) {
        border-bottom: var(--border) solid var(--dark);
      }
    `}</style>
  </article>
);

export default Article;
