import React, { useEffect, useState } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const TopNav = () => {

    const [user, setUser] = useState();
    const { emailSuccess, passwordSuccess } = useSelector(state => state.loginState);
    const cartCount = JSON.parse(localStorage.getItem('cart-list')) || [];

    const navigate = useNavigate();


    useEffect(() => {
        const userValue = JSON.parse(localStorage.getItem("userKey")) || [];
        setUser(userValue);
    }, []);

    const handleProfile = (id) => {
        navigate(`/user/${id}`)
    }

    return (
        <>
            {(emailSuccess && passwordSuccess) || user?.item ? (
                <div className='navbar-bg'>
                    <Navbar expand="lg" className='navBg'>
                        <Container>
                            <Link to='/home' className='nav-link nav-Brand'>ShoppyDo</Link>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="ms-auto">
                                    {(emailSuccess && passwordSuccess) || user.item ? (null)
                                        : (<Link to='/' className='nav-link navLink'>Login</Link>)}
                                    {user?.item ? <div to='/profile' className='nav-link navLink' onClick={() => handleProfile(user.id)}>{user.item.userName}</div> : null}
                                    <Link to='/cart' className='nav-link navLink'>Cart({cartCount.length ? cartCount.length : 0})</Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div >
            ) : (
                null
            )}

        </>
    )
}

export default TopNav