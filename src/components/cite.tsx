const Cite = ({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) => (
  <cite className="root" {...props}>
    {children}
    <style jsx>{`
      .root {
        color: var(--primary);
        text-decoration: underline;
      }
    `}</style>
  </cite>
);

export default Cite;
