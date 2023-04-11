import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import '../../styles/ConfirmOrder.css';
import { useNavigate } from 'react-router';
import DownloadInvoice from '../pdf/DownloadInvoice';

const ConfirmOrder = () => {

    const navigate = useNavigate();

    const [shippingInfo, setShippingInfo] = useState({});
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const shippingAddress = JSON.parse(localStorage.getItem('shipping-info'));
        const cartItems = JSON.parse(localStorage.getItem('cart-list'));
        setShippingInfo(shippingAddress);
        setCartItems(cartItems);
    }, [])

    const shippingPrice = cartItems.reduce((acc, cartItem) => (acc + cartItem.quantity * cartItem.price), 0) > 100 ? 0 : 50;
    const finalPrice = cartItems.reduce((acc, cartItem) => (acc + cartItem.quantity * cartItem.price), 0) + shippingPrice

    return (
        <div className='confirmOrder'>
            <div className='container'>
                <div style={{ fontWeight: 680, fontSize: '20px' }} className='mt-4'>Shipping Details:</div>
                <div className='mt-2'><span style={{ fontWeight: 680 }}>Shipping Address: </span>{shippingInfo.street}, {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country} - {shippingInfo.postalCode}</div>
                <div><span style={{ fontWeight: 680 }}>Contact Number: </span>{shippingInfo.phone}</div>
                <hr />
            </div>
            <div className='container'>
                <div style={{ fontWeight: 680, fontSize: '20px' }}>Your Cart Items Are:</div>
                {cartItems && cartItems.map((cartItem) => (
                    <div className='confirmOrder-cartItem-container' key={cartItem.id} onClick={() => navigate(`/product/${cartItem.id}`)}>
                        <div className='confirmOrder-cartItem-img-container'>
                            <img className='confirmOrder-cartItem-img' src={cartItem.img} alt={cartItem.productName} />
                        </div>
                        <div className='confirmOrder-cartItem-details-container'>
                            <div className='confirmOrder-cartItem-name'>{cartItem.productName}</div>
                            <div className='confirmOrder-cartItem-price'>{cartItem.quantity} X ${cartItem.price} = ${cartItem.quantity * cartItem.price}</div>
                        </div>
                    </div>
                ))}
            </div>
            <Table striped bordered hover className='container'>
                <thead>
                    <tr>
                        <th colSpan={4} style={{ textAlign: 'center' }}>Order Summary</th>
                    </tr>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                {cartItems && cartItems.map((cartItem) => (
                    <tbody key={cartItem.id}>
                        <tr>
                            <td>{cartItem.productName}</td>
                            <td>${cartItem.price}</td>
                            <td>{cartItem.quantity} Item(s)</td>
                            <td>${cartItem.quantity * cartItem.price}</td>
                        </tr>
                    </tbody>
                ))}
                <tbody>
                    <tr>
                        <td colSpan={3}>
                            Shipping
                        </td>
                        <td>
                            ${shippingPrice}
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td colSpan={3}>Final Amount to Pay</td>
                        <td>${finalPrice}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td colSpan={4}>
                            <DownloadInvoice />
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default ConfirmOrder;