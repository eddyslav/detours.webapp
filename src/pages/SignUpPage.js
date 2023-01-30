import {
  useNavigation,
  redirect,
} from 'react-router-dom';

import Register from '../components/Register/Register';

import store from '../store';
import { register } from '../store/auth-actions';

const SignUpPage = () => {
  const navigation = useNavigation();

  return <Register submitting={navigation.state === 'submitting'}/>;
};

SignUpPage.action = async ({ request }) => {
  const formData = await request.formData();

  const success = await store.dispatch(register(formData));
  return success && redirect('/');
};

export default SignUpPage;
