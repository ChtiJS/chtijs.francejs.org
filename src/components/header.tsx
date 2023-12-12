import Link from 'next/link';
import styles from './header.module.scss';

const Header = () => {
  return (
    <>
      <header className={styles.root}>
        <h1>
          <Link href="/" legacyBehavior>
            <a>
              <span>ChtiJS</span>
            </a>
          </Link>
        </h1>
      </header>
    </>
  );
};

export default Header;
