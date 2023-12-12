import { HTMLAttributes } from 'react';
import styles from './hr.module.scss';

const HorizontalRule = (props: HTMLAttributes<HTMLHRElement>) => (
  <>
    <hr className={`${styles.root}$`} {...props} />
  </>
);

export default HorizontalRule;
