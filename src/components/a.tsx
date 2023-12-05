import Link from 'next/link';
import { publicRuntimeConfig } from '../utils/config';
import type { LinkProps } from 'next/link';

const Anchor = ({
  children,
  href,
  as,
  replace,
  scroll,
  shallow,
  passHref,
  prefetch,
  locale,
  className,
  icon,
  iconPosition = 'first',
  ...props
}: {
  children: React.ReactNode;
} & LinkProps & {
    icon?: string;
    iconPosition?: 'first' | 'last';
  } & Exclude<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) => {
  const isURLLink =
    href.length > 30 &&
    children instanceof Array &&
    typeof children[0] === 'string' &&
    href === children[0];

  return (
    <Link
      legacyBehavior
      {...{
        href,
        as,
        replace,
        scroll,
        shallow,
        passHref,
        prefetch,
        locale,
      }}
    >
      <a
        className={`root${className ? ' ' + className : ''}${
          icon ? ` ${iconPosition}` : ''
        }`}
        {...props}
        target={href.startsWith('http') ? '_blank' : '_self'}
      >
        {icon ? <span className="icon" /> : null}
        {isURLLink
          ? [href.replace(/(http|ftp)s?:\/\//, '').slice(0, 15) + '…' + href.slice(-5)]
          : children}
        <style jsx>{`
          a,
          a:visited {
            color: #c1a008;
            transition: color 0.1s linear;
            text-decoration: none;
          }
          a:hover,
          a:focus {
            color: var(--primary);
          }
          a.first,
          a.last {
            display: inline-flex;
            flex-direction: row;
            gap: calc(var(--gutter) / 4);
          }
          a.first span.icon,
          a.last span.icon {
            display: flex;
            height: var(--vRythm);
            width: calc(var(--vRythm) * 0.55);
            background: var(--primary);
            mask-repeat: no-repeat;
            mask-size: calc(var(--vRythm) * 0.55);
            -webkit-mask-size: calc(var(--vRythm) * 0.55);
            mask-position: left bottom;
            mask-image: url('${publicRuntimeConfig.basePath}/images/icons/arrow-left.svg');
          }
          a.last {
            flex-direction: row-reverse;
          }
          a.last span.icon {
            mask-image: url('${publicRuntimeConfig.basePath}/images/icons/arrow-right.svg');
          }
        `}</style>
      </a>
    </Link>
  );
};

export default Anchor;
