const Code = ({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) => (
  <code className="root" {...props}>
    {children}
    <style jsx>{`
      .root {
        text-decoration: none;
        font-family: monospace;
      }
    `}</style>
  </code>
);

export default Code;
