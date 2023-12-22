import Link from 'next/link';
import Social from './social';
import { ORGANISATION_NAME } from '../utils/constants';
import styles from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.p}>
        © {ORGANISATION_NAME} - Tous droits réservés -{' '}
        <Link
          href="/mentions-legales"
          className={styles.a}
          title="Accéder aux mentions légales"
        >
          Mentions légales
        </Link>
        <Social />
      </p>
    </footer>
  );
};

export default Footer;
