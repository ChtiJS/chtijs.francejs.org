const Heading1 = ({
  children,
  className,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLElement>) => (
  <h1 className={`root${className ? ' ' + className : ""}`} {...props}>
    {children}
    <style jsx>{`
      .root {
        color: var(--primary);
        font-family: var(--headingFont);
        font-size: var(--giantFontSize);
        line-height: var(--giantLineHeight);
        font-weigth: bold;
        margin: 0 0 calc(var(--vRythm) * 2) 0;
        text-align: center;
      }
    `}</style>
  </h1>
);

export default Heading1;
