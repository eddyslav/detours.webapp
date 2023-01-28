import {
  redirect,
  useNavigation,
} from 'react-router-dom';

import Login from '../components/Login/Login';

import store from '../store';
import { login } from '../store/auth-actions';

const LoginPage = () => {
  const navigation = useNavigation();

  return <Login submitting={navigation.state === 'submitting'} />;
};

LoginPage.action = async ({ request }) => {
  const formData = await request.formData();

  const email = formData.get('email');
  const password = formData.get('password');

  const res = await store.dispatch(login(email, password));
  return res && redirect('/');
};

export default LoginPage;
