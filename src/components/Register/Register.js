import classes from './Register.module.css';

import Spinner from '../UI/Spinner/Spinner';
import SecondaryHeading from '../UI/Headings/SecondaryHeading';

import Form from '../UI/Form/Form';

const Register = ({ submitting }) => {
  return (
    <div className={classes['signup-form']}>
      <SecondaryHeading>Create your account!</SecondaryHeading>

      <Form method='post' action='/register'>
        <Form.Group>
          <Form.Label htmlFor='name'>Your name</Form.Label>
          <Form.Input
            id='name'
            name='name'
            type='text'
            placeholder='John Smith'
            required={true}
          />
        </Form.Group>

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
            minLength={8}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='passwordConfirm'>Confirm password</Form.Label>
          <Form.Input
            id='passwordConfirm'
            name='passwordConfirm'
            type='password'
            placeholder='••••••••'
            required={true}
            minLength={8}
          />
        </Form.Group>

        <Form.Group>
          {(submitting && <Spinner />) || <Form.Submit>Sign up</Form.Submit>}
        </Form.Group>
      </Form>
    </div>
  );
};

export default Register;
