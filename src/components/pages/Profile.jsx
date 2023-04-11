import React, { useEffect, useState } from 'react';
import { logoutSuccess } from '../../slices/loginSlice';
import { useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import Loading from '../plugins/Loading';
import '../../styles/Profile.css';
import { doc, getDoc } from 'firebase/firestore';
import { firebaseData } from '../../firebase/config';

const Profile = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [snap, setSnap] = useState();

    const [userValue, setUserValue] = useState();

    const { id } = useParams();

    useEffect(() => {
        const asyncFunc = async () => {
            const userDocRef = doc(firebaseData, "users", id);
            setSnap(await getDoc(userDocRef));
            setUserValue(snap?.data())
        }
        asyncFunc();
    }, [id, snap, userValue])

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logoutSuccess());
        navigate('/');
        localStorage.removeItem('userKey');
        window.location.reload()
    }

    return (
        <div>
            {
                userValue === undefined ? (
                    <Loading />
                ) : (
                    <div className='profile'>
                        <div className='container'>
                            <div className='user-profile-container'>
                                <div className='user-img-container'>
                                    <img src={userValue.img ? userValue.img : '/img/users/default-profile-img.jpg'} alt={userValue.username} className='user-img' />
                                </div >
                                <div className='user-details-container'>
                                    <div className='container'>
                                        <div className='user-username'><span className='userValue-key'>User Name: </span>{userValue.userName}</div >
                                        <div className='user-email'><span className='userValue-key'>Email: </span>{userValue.email}</div >
                                        <div className='user-phonenumber'><span className='userValue-key'>Phone Number: </span>{userValue.phoneNumber}</div>
                                        <button className='address-btn' onClick={() => navigate('/address')}>Address</button>
                                        <button onClick={handleLogout} className='logout-btn'>Logout</button>
                                    </div>
                                </div>
                            </div>
                        </div >
                    </div >
                )
            }
        </div>

    )
}

export default Profile;