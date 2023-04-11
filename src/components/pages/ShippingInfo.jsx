import React, { useEffect, useState } from 'react';
import '../../styles/ShippingInfo.css';
import { useNavigate } from 'react-router';
import { Modal } from 'react-bootstrap';

const ShippingInfo = () => {

    const [show, setShow] = useState(false);
    const [localAddresses, setLocalAddresses] = useState();
    const [postAddress, setPostAddress] = useState();

    const navigate = useNavigate()
    const [alert, setAlert] = useState();
    const [shippingInfo, setShippingInfo] = useState({
        street: "",
        city: "",
        phone: "",
        postalCode: "",
        country: "",
        state: "",
    })

    const submitHandler = (e) => {
        e.preventDefault();
        localStorage.setItem("shipping-info", JSON.stringify(shippingInfo))
        if (!shippingInfo.street ||
            !shippingInfo.city ||
            !shippingInfo.state ||
            !shippingInfo.country ||
            !shippingInfo.postalCode ||
            !shippingInfo.phone) {
            setAlert(true)
        } else navigate("/confirmorder")
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo(prevState => ({ ...prevState, [name]: value }))
    }

    useEffect(() => {
        if (alert) {
            setTimeout(() => {
                setAlert(false)
            }, 1500)
        }
    })

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setLocalAddresses(JSON.parse(localStorage.getItem("address-list")) || []);
    }

    useEffect(() => { })

    const handleSelectAddress = (street) => {
        setPostAddress(
            localAddresses.find(locAddress => {
                return locAddress.street === street
            }));
    }

    useEffect(() => {
        if (postAddress === undefined) {
            return () => { }
        } else {
            setShippingInfo(postAddress);
        }
    }, [postAddress])

    return (
        <div>
            <div className='container'>
                <div className='shippingInfo-form'>
                    <form onSubmit={submitHandler} className='shipping-form shadow-lg p-4'>
                        <h1 className='shippingInfo-heading'>Shipping Details</h1>
                        <div className='shippingInfo-address-container'>
                            <label className='shippingInfo-address-label'>Street</label>
                            <input type='text' className='shippingInfo-address-input' name='street' value={shippingInfo.street} onChange={handleChange} />
                        </div>
                        <div className='shippingInfo-city-container'>
                            <label className='shippingInfo-city-label'>City</label>
                            <input type='text' className='shippingInfo-city-input' name='city' value={shippingInfo.city} onChange={handleChange} />
                        </div>
                        <div className='shippingInfo-phoneNo-container'>
                            <label className='shippingInfo-phoneNo-label'>Phone No</label>
                            <input
                                type='text'
                                className='shippingInfo-phoneNo-input'
                                name='phone'
                                value={shippingInfo.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='shippingInfo-postalCode-container'>
                            <label className='shippingInfo-postalCode-label'>Postal Code</label>
                            <input
                                type='text'
                                className='shippingInfo-postalCode-input'
                                name='postalCode'
                                value={shippingInfo.postalCode}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='shippingInfo-country-container'>
                            <label className='shippingInfo-country-label'>Country</label>
                            <input
                                type='text'
                                className='shippingInfo-country-input'
                                name='country'
                                value={shippingInfo.country}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='shippingInfo-state-container'>
                            <label className='shippingInfo-state-label'>State</label>
                            <input
                                type='text'
                                className='shippingInfo-state-input'
                                name='state'
                                value={shippingInfo.state}
                                onChange={handleChange}
                            />
                        </div>
                        <button className='continue-btn' type='submit'>Continue</button>
                            <button className='choose-address-btn' type='button' onClick={handleShow} >Choose Address</button>
                    </form>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Your address</Modal.Title>
                </Modal.Header>
                <div className='container'>
                    {localAddresses && localAddresses.map((localAddress) => (
                        <div
                            className='select-address'
                            onClick={() => {
                                handleSelectAddress(localAddress.street)
                                handleClose();
                            }}
                            key={localAddress.street}>{localAddress.street}, {localAddress.city}, {localAddress.state}, {localAddress.country} - {localAddress.postalCode}</div>
                    ))}
                </div>
            </Modal>
        </div>
    )
}

export default ShippingInfo;