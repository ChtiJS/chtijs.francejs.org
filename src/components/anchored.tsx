import Link from 'next/link';
import styles from './anchored.module.scss';

const Anchored = ({
  children,
  id = '',
}: {
  children: React.ReactNode;
  id?: string;
}) => {
  return (
    <span className={styles.root}>
      {children}{' '}
      <small>
        <Link href={`#${id}`} legacyBehavior>
          <a className={styles.icon} id={id} title={`Aller à la section "${id}"`}>
            <span>🔗</span>
          </a>
        </Link>
      </small>
    </span>
  );
};

export default Anchored;
