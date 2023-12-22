import Link from 'next/link';
import styles from './a.module.scss';
import { type ComponentProps } from 'react';

export default function Anchor({
  children,
  href,
  className,
  icon,
  iconPosition = 'first',
  ...props
}: {
  title: string;
  icon?: string;
  iconPosition?: 'first' | 'last';
} & Omit<ComponentProps<typeof Link>, 'target'>) {
  const isURLLink =
    href.toString().length > 30 &&
    children instanceof Array &&
    typeof children[0] === 'string' &&
    href === children[0];

  return (
    <Link
      {...{
        href,
      }}
      className={[
        styles.root,
        ...(className ? [className] : []),
        ...(icon
          ? [
              styles.withIcon,
              iconPosition === 'first' ? styles.first : styles.last,
            ]
          : []),
      ].join(' ')}
      {...props}
      target={href.toString().startsWith('http') ? '_blank' : '_self'}
    >
      {icon ? <span className={styles.icon} aria-hidden="true" /> : null}
      {isURLLink
        ? [
            href.replace(/(http|ftp)s?:\/\//, '').slice(0, 15) +
              '…' +
              href.slice(-5),
          ]
        : children}
    </Link>
  );
}
