import { redirect } from 'react-router-dom';

import store from '../store';
import { logout } from '../store/auth-slice';

export const loader = () => {
  store.dispatch(logout());
  return redirect('/');
};
