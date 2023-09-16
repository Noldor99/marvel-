import React from 'react';
import css from './Footer.module.sass'

const Footer: React.FC = () => {
  return (
    <footer className={css.footer}>
      <div className={css.footer__content}>
        <p>&copy; 2023 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
