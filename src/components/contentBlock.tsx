import { CSS_BREAKPOINT_START_L, CSS_BREAKPOINT_START_XL } from "../utils/constants";

export default function ContentBlock({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <section className={`root${className ? " " + className : ""}`}>
      {children}
      <style jsx>{`
        .root {
          background-color: var(--light);
          padding: calc(var(--vRythm) * 2) var(--gutter);
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_L}) {
          .root {
            padding: calc(var(--vRythm) * 2) calc(var(--gutter) * 2);
          }
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_XL}) {
          .root {
            padding: calc(var(--vRythm) * 3) calc(var(--gutter) * 8);
          }
        }
      `}</style>
    </section>
  );
}