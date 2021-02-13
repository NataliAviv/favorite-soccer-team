import React, { useState, useEffect } from 'react';
import pass from '../../images/Icon_unlock.png';
import mail from '../../images/Icon_user.png';
import { serverLogin } from '../../Service';
import { saveToStorage } from '../../storage';
import { withRouter } from 'react-router';
import Form from 'react-bootstrap/Form';

function Login(props) {
  const EMAIL_INPUT = 1;
  const PASS_INPUT = 2;
  const [userName, setUserName] = useState('');
  const [userPass, setUserPass] = useState('');
  const [error, setError] = useState({ userName: false, userPass: false });
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className='card'>
      <div className='container'>
        <span className='title'>Sign In To See The Teams</span>
        <br></br>
        <div className='form-container'>{renderInputs()}</div>
        <br></br>
        <div className='form-account small-text'>
          Not Registered yet?
          <a className='small-text' href='/signUp'>
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );

  function renderInputs() {
    return (
      <Form className='form' onSubmit={handleSubmit}>
        <Form.Group controlId='formGroupEmail'>
          <br></br>
          <Form.Label className='small-text'>
            <img src={mail} alt='mail' /> Email{' '}
          </Form.Label>
          <Form.Control
            value={userName}
            placeholder='Enter your email...'
            onChange={event => handleChange(event, EMAIL_INPUT)}
          />
          <br />{' '}
          {error.userName && (
            <span className='error'>You must enter your email...</span>
          )}
        </Form.Group>
        <Form.Group controlId='formGroupPass'>
          <Form.Label className='small-text'>
            <img src={pass} alt='pass' /> Password{' '}
          </Form.Label>
          <Form.Control
            value={userPass}
            type='password'
            placeholder='Enter your password...'
            onChange={event => handleChange(event, PASS_INPUT)}
          />
          {error.userPass && (
            <span className='error'>You must enter your password...</span>
          )}
        </Form.Group>
        <div className='btn-container'>
          <input className='btn-login' type='submit' value='Login' />
        </div>
      </Form>
    );
  }

  function handleChange(event, type) {
    const { value } = event.target;
    type === EMAIL_INPUT ? setUserName(value) : setUserPass(value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const loginData = {
      user: {
        userName: userName,
        password: userPass
      }
    };
    if (validation()) {
      const res = await serverLogin(loginData);
      console.log(res);
      if (res.token) {
        saveToStorage('token', { token: res.token });
        props.history.push('/main');
      }
    }
  }

  function validation() {
    let isValid = true;
    let email = false;
    let pass = false;

    if (userName === '') {
      email = true;
      isValid = false;
    }

    if (userPass === '') {
      pass = true;
      isValid = false;
    }
    setError({ userName: email, userPass: pass });

    return isValid;
  }
}
export default withRouter(Login);
