import { Outlet } from 'react-router-dom';

import classes from './Layout.module.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = () => (
  <>
    <Header />

    <main className={classes.main}>
      <Outlet />
    </main>

    <Footer />
  </>
);

export default Layout;
