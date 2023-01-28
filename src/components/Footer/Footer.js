import { Link } from 'react-router-dom';

import classes from './Footer.module.css';

import logo from '../../resources/logo-green.png';

const year = new Date().getFullYear();

const Footer = () => (
  <footer className={classes.footer}>
    <div className={classes.footer__logo}>
      <img src={logo} alt='Detours logo' />
    </div>

    <ul className={classes.footer__nav}>
      <li>
        <Link to='#'>About us</Link>
      </li>

      <li>
        <Link to='#'>Download apps</Link>
      </li>

      <li>
        <Link to='#'>Become a guide</Link>
      </li>

      <li>
        <Link to='#'>Careers</Link>
      </li>

      <li>
        <Link to='#'>Contact</Link>
      </li>
    </ul>

    <p className={classes.footer__copyright}>
      &copy; {year} by Sviatoslav Vladyka
    </p>
  </footer>
);

export default Footer;
