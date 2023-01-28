import {
  Navigate,
  useActionData,
  useNavigation,
  useLocation, redirect,
} from 'react-router-dom';

import Register from '../components/Register/Register';

import store from '../store';
import { register } from '../store/auth-actions';

const RegisterPage = () => {
  const navigation = useNavigation();
  const location = useLocation();
  const isError = useActionData();

  if (isError === false) {
    const from = location.state?.from?.pathname || '/';
    console.log(from);
    return <Navigate to={from} />
  }

  return <Register submitting={navigation.state === 'submitting'} />;
};

RegisterPage.action = async ({ request }) => {
  const formData = await request.formData();

  const success = await store.dispatch(register(formData));
  return success && redirect('/');
};

export default RegisterPage;
