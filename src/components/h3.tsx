const Heading3 = ({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLElement>) => (
  <h3 className="root" {...props}>
    {children}
    <style jsx>{`
      .root {
        font-family: var(--headingFont);
        font-size: var(--bigFontSize);
        line-height: var(--bigLineHeight);
        text-decoration: underline;
        font-weigth: normal;
        margin: var(--vRythm) 0 0 0;
      }
    `}</style>
  </h3>
);

export default Heading3;
