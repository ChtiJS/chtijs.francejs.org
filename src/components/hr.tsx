import { HTMLAttributes } from 'react';

const HorizontalRule = (props: HTMLAttributes<HTMLHRElement>) => (
  <>
    <hr className="root" {...props} />
    <style jsx>{`
      .root {
        border-bottom: var(--border) solid var(--green2);
        margin: 0 0 var(--vRythm) 0;
      }
    `}</style>
  </>
);

export default HorizontalRule;
