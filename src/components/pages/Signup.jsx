import React, { useEffect, useState } from 'react';
// import {useNavigate} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import '../../styles/Signup.css';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../actions/authAction';
import { Alert, Snackbar } from '@mui/material';

const Signup = () => {

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const { errorMsg } = useSelector(state => state.authState);

    const [error, setError] = useState();

    const { isAuthenticated } = useSelector(state => state.authState);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(signup({
            userName,
            email,
            phoneNumber,
            password
        }))
        if ((!userName || !email || !phoneNumber || !password) && !isAuthenticated) {
            setError(true);
        }
    }

    useEffect(() => {
        if ((!userName || !email || !phoneNumber || !password) && !isAuthenticated) {
            setTimeout(() => {
                setError(false)
            }, 2000)
        }
        if (isAuthenticated) {
            navigate('/home');
        }
    }, [userName, email, phoneNumber, password, isAuthenticated, navigate])

    return (
        <div className='signup'>
            <div className='container'>
                <form className='signupForm mt-5 mb-5 w-60 shadow-lg p-4' style={{ marginLeft: '20%' }} onSubmit={handleSubmit}>
                    <div style={{ fontSize: '25px', fontWeight: 680, textAlign: 'center' }}>Signup</div>
                    <div className='float-start mt-3' style={{ width: '49%' }}>
                        <TextField id="outlined-basic" type='text' value={userName} onChange={(e) => setUserName(e.target.value)} label="User Name" variant="outlined" className='w-100' />
                    </div>
                    <div className='float-start mt-3' style={{ width: '49%', marginLeft: '2%' }}>
                        <TextField id="outlined-basic" type='email' value={email} onChange={(e) => setEmail(e.target.value)} label="Email Id" variant="outlined" className='w-100' />
                    </div>
                    <div className='float-start mt-3' style={{ width: '49%' }}>
                        <TextField id="outlined-basic" type='number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} label="phoneNumber" variant="outlined" className='w-100' />
                    </div>
                    <div className='float-start mt-3' style={{ width: '49%', marginLeft: '2%' }}>
                        <TextField id="outlined-basic" type="password" value={password} onChange={(e) => setPassword(e.target.value)} label="Password" variant="outlined" className='w-100' />
                    </div>
                    <button className='signup-btn w-100 mt-3' style={{ height: '45px' }}>SIGNUP</button>
                </form>
            </div>
            {error ?
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
                : null}
        </div>
    )
}

export default Signup;