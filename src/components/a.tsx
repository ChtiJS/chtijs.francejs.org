import Link from 'next/link';
import styles from './a.module.scss';
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
        className={`${styles.root}${className ? ' ' + className : ''}${
          icon
            ? ` ${styles.withIcon} ${
                iconPosition === 'first' ? styles.first : styles.last
              }`
            : ''
        }`}
        {...props}
        target={href.startsWith('http') ? '_blank' : '_self'}
      >
        {icon ? <span className={styles.icon} /> : null}
        {isURLLink
          ? [
              href.replace(/(http|ftp)s?:\/\//, '').slice(0, 15) +
                '…' +
                href.slice(-5),
            ]
          : children}
      </a>
    </Link>
  );
};

export default Anchor;
