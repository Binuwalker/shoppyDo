import React from 'react';
import { logoutSuccess } from '../../slices/authSlice';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../plugins/Loading';
import '../../styles/Profile.css';

const Profile = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {userDataValue} = useSelector(state => state.authState);

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logoutSuccess());
        navigate('/');
        localStorage.removeItem('userKey');
    }

    return (
        <div>
            {
                userDataValue === undefined ? (
                    <Loading />
                ) : (
                    <div className='profile'>
                        <div className='container'>
                            <div className='user-profile-container'>
                                <div className='user-img-container'>
                                    <img src={userDataValue.img ? userDataValue.img : '/img/users/default-profile-img.jpg'} alt={userDataValue.username} className='user-img' />
                                </div >
                                <div className='user-details-container'>
                                    <div className='container'>
                                        <div className='user-username'><span className='userValue-key'>User Name: </span>{userDataValue.userName}</div >
                                        <div className='user-email'><span className='userValue-key'>Email: </span>{userDataValue.email}</div >
                                        <div className='user-phonenumber'><span className='userValue-key'>Phone Number: </span>{userDataValue.phoneNumber}</div>
                                        <div className='user-phonenumber'><span className='userValue-key'>Jsoined On: </span>{userDataValue.joinedOn}</div>
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