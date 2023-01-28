import { useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { getUsersImg } from '../../api/constants';

import { getMe } from '../../store/auth-actions';

import classes from './Header.module.css';

import logo from '../../resources/logo-white.png';

const Header = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.isAuthenticated) {
      dispatch(getMe());
    }
  }, [dispatch, auth.isAuthenticated]);

  return (
    <header className={classes.header}>
      <div>
        <Link to='/'>
          <img className={classes.logo} alt='Detours logo' src={logo} />
        </Link>
      </div>

      <nav className={classes['main-nav']}>
        <ul className={classes['main-nav-list']}>
          {(auth.isAuthenticated && auth.me && (
            <>
              <li>
                <Link
                  className={`${classes['main-nav-link']} ${classes['main-nav-link--logout']}`}
                  to='/logout'
                >
                  Log out
                </Link>
              </li>

              <li>
                <Link className={classes['main-nav-link']}>
                  <img
                    className={classes['main-nav-link__user-img']}
                    src={getUsersImg(auth.me.photo)}
                    alt={auth.me.name}
                  />
                  <span>{auth.me.name.split(' ')[0]}</span>
                </Link>
              </li>
            </>
          )) || (
            <>
              <li>
                <Link className={classes['main-nav-link']} to='/login'>
                  Log in
                </Link>
              </li>
              <li>
                <Link
                  className={`${classes['main-nav-link']} ${classes['nav-cta']}`}
                  to='/register'
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
