import React from 'react';
import styles from './Footer.module.css';
import { ReactComponent as Car } from '../Assets/car-footer.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Car />
      <p>Front-end na serra. Todos direitos reservados.</p>
    </footer>
  );
};

export default Footer;
