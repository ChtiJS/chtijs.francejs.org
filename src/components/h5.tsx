const Heading5 = ({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLElement>) => (
  <h5 className="root" {...props}>
    {children}
    <style jsx>{`
      .root {
        font-family: var(--headingFont);
        font-size: var(--mediumFontSize);
        line-height: var(--mediumLineHeight);
        margin: 0 0 var(--vRythm) 0;
      }
    `}</style>
  </h5>
);

export default Heading5;
