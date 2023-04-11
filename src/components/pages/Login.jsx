import React, { useEffect, useState } from 'react';
import '../../styles/Login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaExclamationCircle } from 'react-icons/fa';
import { AiFillCheckCircle } from 'react-icons/ai';
import { login } from '../../actions/loginAction';
import { loginEmailSuccess, loginPasswordSuccess } from '../../slices/loginSlice';
import { Alert, Snackbar } from '@mui/material';
import { onSnapshot, query, collection } from 'firebase/firestore';
import { firebaseData } from '../../firebase/config';

const q = query(collection(firebaseData, 'users'));

const Login = () => {

  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [successMsg, setSuccessMsg] = useState();
  const [userDatas, setUserDatas] = useState();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { emailError, emailSuccess, emailErrorMsg, passwordError, passwordSuccess, passwordErrorMsg } = useSelector(state => state.loginState);

  let userValue = localStorage.getItem('userKey');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    if (emailSuccess && passwordSuccess) {
      userValue = JSON.parse(userValue);
      console.log(userValue);
    }
    let userGetId = userDatas?.find(value => {
      return value.item.email === email
    })
    console.log(userGetId);
    try {
      if (userDatas === undefined) {
        setError(true)
        setSuccess(false)
        setErrorMsg('User not found with this Id');
      } else {
        if (userGetId.item.password === password) {
          setSuccess(true);
          setSuccessMsg('Login Success');
          localStorage.setItem('userKey', JSON.stringify(userGetId));
          navigate('/home');
          window.location.reload();
        } else if (password === undefined) {
          setError(true)
          setSuccess(false)
          setErrorMsg('Enter a Password');
        } else if (userGetId.item.password === undefined) {
          setError(true)
          setSuccess(false)
          setErrorMsg('Invalid Password');
        } else if (password !== userGetId.item.password) {
          setError(true)
          setSuccess(false)
          setErrorMsg('Invalid Password');
        }
      }
    } catch (err) {
      console.log('Login failed due to ' + err);
      setError(true)
      setSuccess(false)
      setErrorMsg('Login failed due to ' + err);
    }
  }

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setUserDatas(snapshot.docs.map(doc => ({
        id: doc.id,
        item: doc.data()
      })));
    })
  }, [userDatas])

  useEffect(() => {
    if (userValue) {
      dispatch(loginEmailSuccess());
      dispatch(loginPasswordSuccess());
    }

  }, [emailSuccess, passwordSuccess, navigate, dispatch, userValue])

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false)
      }, 1500)
    }
    if (success) {
      setTimeout(() => {
        setSuccess(false)
      }, 1500)
    }
  }, [error, success])

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
              <div>
                <div className='login-emailError'>{emailErrorMsg}</div>
                <div className='login-StatusIcons'>
                  {emailError ? <FaExclamationCircle className='login-StatusIcon-exclamation' /> : null}
                  {emailSuccess ? <AiFillCheckCircle className='login-StatusIcon-check' /> : null}
                </div>
              </div>
              <label className='login-passwordLabel'>Password:</label>
              <input
                className='login-passwordInput'
                type='password'
                placeholder='Please enter the password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <div>
                <div className='login-passwordError'>{passwordErrorMsg}</div>
                <div className='login-StatusIcons'>
                  {passwordError ? <FaExclamationCircle className='login-StatusIcon-exclamation' /> : null}
                  {passwordSuccess ? <AiFillCheckCircle className='login-StatusIcon-check' /> : null}
                </div>
              </div>
              <button className='login-btn'>Login</button>
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