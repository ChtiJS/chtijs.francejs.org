const Blockquote = ({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.BlockquoteHTMLAttributes<HTMLElement>) => (
  <blockquote className="root" {...props}>
    {children}
    <style jsx>{`
      .root {
        font-family: var(--writingFont);
        font-size: var(--greatFontSize);
        line-height: var(--greatLineHeight);
        margin: 0 0 var(--vRythm) 0;
        padding: 0 0 0 var(--gutter);
        border-left: var(--border) solid var(--green2);
      }
    `}</style>
  </blockquote>
);

export default Blockquote;
