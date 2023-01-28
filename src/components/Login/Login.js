import classes from './Login.module.css';

import Form from '../UI/Form/Form';

import Spinner from '../UI/Spinner/Spinner';

import SecondaryHeading from '../UI/Headings/SecondaryHeading';

const Login = ({ submitting }) => (
  <div className={classes['login-form']}>
    <SecondaryHeading>Log into your account</SecondaryHeading>

    <Form method='post' action='/login'>
      <Form.Group>
        <Form.Label htmlFor='email'>Email address</Form.Label>
        <Form.Input
          id='email'
          name='email'
          type='email'
          placeholder='you@example.com'
          required={true}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor='password'>Password</Form.Label>
        <Form.Input
          id='password'
          name='password'
          type='password'
          placeholder='••••••••'
          required={true}
        />
      </Form.Group>

      <Form.Group>
        {(submitting && <Spinner />) || <Form.Submit>Login</Form.Submit>}
      </Form.Group>
    </Form>
  </div>
);

export default Login;
