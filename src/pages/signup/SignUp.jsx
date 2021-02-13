import React, { useState, useEffect } from 'react';
import './SignUp.css';
import useForm from './UseForm';
import { serverRegister } from '../../Service';
import { saveToStorage } from '../../storage';
import { withRouter } from 'react-router';
import Form from 'react-bootstrap/Form';
import pass from '../../images/Icon_unlock.png';
import mail from '../../images/Icon_user.png';
function SignUp(props) {
  const { handleChange, userDetails } = useForm();
  const [error, setError] = useState(false);
  useEffect(() => {}, [error]);

  return (
    <div className='card'>
      <div className='container'>
        <span className='title'>Sign Up To See The Teams</span>
        <br></br>
        <div className='form-container'>
          {renderUserInput()}

          <br></br>
          <span className='small-text'>Already have an account? </span>
          <a className='small-text' href='/login'>
            login
          </a>
        </div>
      </div>
    </div>
  );

  function renderUserInput() {
    return (
      <Form className='form' onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label className='small-text'>
            <img src={mail} alt='mail' />
            Email{' '}
          </Form.Label>
          <Form.Control
            id='email'
            value={userDetails.email}
            type='email'
            name='email'
            className='userInput'
            placeholder='Enter your email'
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className='small-text'>
            {' '}
            <img src={pass} alt='pass' />
            Password{' '}
          </Form.Label>
          <Form.Control
            id='password'
            value={userDetails.password}
            type='password'
            name='password'
            className='userInput'
            placeholder='Enter your user password'
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className='small-text'> Confirm Password </Form.Label>
          <Form.Control
            value={userDetails.password2}
            type='password'
            name='password2'
            className='userInput'
            placeholder='Confirm your password'
            onChange={handleChange}
          />
        </Form.Group>
        <div className='btn-container'>
          <input className='btn-login' type='submit' value='Sign Up' />
        </div>
      </Form>
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const signUpdetails = {
      user: {
        userName: userDetails.email,
        password: userDetails.password
      }
    };
    if (validation()) {
      const res = await serverRegister(signUpdetails);
      console.log(res);
      if (res.token) {
        saveToStorage('token', { token: res.token });
        props.history.push('/main');
      }
    }
  }

  function validation() {
    let isValid = true;

    if (userDetails.email === '') {
      isValid = false;
    }

    if (userDetails.password === '') {
      isValid = false;
    }

    setError(isValid);

    return isValid;
  }
}

export default withRouter(SignUp);
