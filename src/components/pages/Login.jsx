import React, { useEffect, useState } from 'react';
import '../../styles/Login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/authAction';
import { Alert, Snackbar } from '@mui/material';

const Login = () => {

  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [successMsg, setSuccessMsg] = useState();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, errorMsg } = useSelector(state => state.authState);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    if ((email || password) && !isAuthenticated) {
      setError(true)
    }
  }

  useEffect(() => {
    if ((email || password) && !isAuthenticated) {
      setTimeout(() => {
        setError(false)
      }, 3000)
    }
    if (isAuthenticated) {
      setError(false, null)
      setSuccess(true)
      navigate('/home');
      setSuccessMsg('Login Successfull')
    }
  }, [email, password, isAuthenticated, navigate])

  return (
    <div className='login'>
      <div className='container'>
        <div className='login-form-container'>
          <div className='login-dummy'></div>
          <form className='login-form' onSubmit={submitHandler}>
            <div className='container'>
              <div className='login-heading'>LOGIN</div>
              <label className='login-emailLabel'>Email:</label>
              <input
                className='login-emailInput'
                type='text'
                placeholder='Please enter the email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <label className='login-passwordLabel'>Password:</label>
              <input
                className='login-passwordInput'
                type='password'
                placeholder='Please enter the password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button className='login-btn' type='submit'>Login</button>
              <div onClick={() => navigate('/signup')}>Don't have an account</div>
            </div>
          </form>
        </div>
        {error &&
          <Snackbar
            open={error}
            anchorOrigin={
              {
                horizontal: 'center',
                vertical: 'top'
              }
            }
            transitionDuration={1500}
          >
            <Alert severity='error' onClose={() => setError(false)}>
              {errorMsg}
            </Alert>
          </Snackbar>
        }
        {success &&
          <Snackbar
            open={success}
            anchorOrigin={
              {
                horizontal: 'center',
                vertical: 'top'
              }
            }
            transitionDuration={1500}
          >
            <Alert severity='success' onClose={() => setSuccess(false)}>
              {successMsg}
            </Alert>
          </Snackbar>
        }
      </div>
    </div>
  )
}

export default Login;