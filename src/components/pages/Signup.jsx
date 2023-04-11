import React, { useEffect, useState } from 'react';
// import {useNavigate} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { firebaseData } from '../../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import '../../styles/Signup.css';
import { useNavigate } from 'react-router';

const Signup = () => {

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [joinedOn, setJoinedOn] = useState();

    const [error, setError] = useState()
    const [errorMsg, setErrorMsg] = useState()
    const [success, setSuccess] = useState()
    const [successMsg, setSuccessMsg] = useState()

    let getDateValue = new Date();
    let getMonth = getDateValue.getMonth() + 1
    let currentDate = getDateValue.getDate() + '/' + getMonth + '/' + getDateValue.getFullYear();


    const navigate = useNavigate();

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     let signupValues = { username, email, phoneNumber, password }
    //     const asyncFunc = async () => {
    //         const config = {
    //             headers: {
    //                 'content-type':'application/json'
    //             }
    //         }
    //         await axios.post(`http://localhost:3001/users`, JSON.stringify({...signupValues}), config)
    //             .then(res => {
    //                 alert("Registered Successfully", res)
    //             })
    //             .catch(err => {
    //                 alert(err)
    //             })
    //     }
    //     asyncFunc();

    // }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (userName || email || phoneNumber || password) {
            setError(false)
            addDoc(collection(firebaseData, 'users'), {
                userName,
                email,
                phoneNumber,
                password,
                joinedOn
            })
            setSuccess(true)
            setSuccessMsg('User Added Successfully');
            setUserName(null);
            setEmail(null);
            setPhoneNumber(null);
            setPassword(null);
            navigate('/')
        } else if (!userName || !email || !phoneNumber || !password) {
            setSuccess(false);
            setError(true);
            setErrorMsg('Please enter all the Values');
        }
    }

    useEffect(() => {
        setJoinedOn(currentDate);
    },[currentDate])

    return (
        <div className='signup'>
            <div className='container'>
                <form className='signupForm mt-5 mb-5 w-60 shadow-lg p-4' style={{ marginLeft: '20%' }} onSubmit={handleSubmit}>
                    <div style={{ fontSize: '25px', fontWeight: 680, textAlign: 'center' }}>Signup</div>
                    <div className='float-start mt-3' style={{ width: '49%' }}>
                        <TextField id="outlined-basic" value={userName} onChange={(e) => setUserName(e.target.value)} label="User Name" variant="outlined" className='w-100' />
                    </div>
                    <div className='float-start mt-3' style={{ width: '49%', marginLeft: '2%' }}>
                        <TextField id="outlined-basic" value={email} onChange={(e) => setEmail(e.target.value)} label="Email Id" variant="outlined" className='w-100' />
                    </div>
                    <div className='float-start mt-3' style={{ width: '49%' }}>
                        <TextField id="outlined-basic" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} label="phoneNumber" variant="outlined" className='w-100' />
                    </div>
                    <div className='float-start mt-3' style={{ width: '49%', marginLeft: '2%' }}>
                        <TextField id="outlined-basic" value={password} onChange={(e) => setPassword(e.target.value)} label="Password" variant="outlined" className='w-100' />
                    </div>
                    <button className='signup-btn w-100 mt-3' style={{ height: '45px' }}>SIGNUP</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;