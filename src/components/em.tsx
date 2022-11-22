const Emphasis = ({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) => (
  <em className="root" {...props}>
    {children}
    <style jsx>{`
      .root {
        text-decoration: none;
        font-style: italic;
      }
    `}</style>
  </em>
);

export default Emphasis;
