import React, { useState, useEffect } from 'react';
import { Document, Page } from '@react-pdf/renderer';
import ReactDOMServer from 'react-dom/server';
import { Html } from 'react-pdf-html';

const Invoice = () => {

    let [cartItems, setCartItems] = useState([]);
    const [shippingInfo, setShippingInfo] = useState({});

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("cart-list")) || [];
        setCartItems(items);
        const shippingAddress = JSON.parse(localStorage.getItem('shipping-info'));
        setShippingInfo(shippingAddress);
    }, []);


    const shippingPrice = cartItems.reduce((acc, cartItem) => (acc + cartItem.quantity * cartItem.price), 0) > 100 ? 0 : 50;
    const finalPrice = cartItems.reduce((acc, cartItem) => (acc + cartItem.quantity * cartItem.price), 0) + shippingPrice

    const element = (
        <html>
            <body>
                <style>
                    {`
                    .invoice-title {
                        text-align: center;
                        font-size: 20px;
                        font-weight: 680;
                    }
                    .order-title {
                        text-align: center;
                        font-size: 20px;
                        font-weight: 680;
                    }
                    .confirmOrder-cartItem-container {
                        height: 100px;
                        width: 100%;
                        margin-top: 10px;
                        margin-left: 1%;
                    }
                    
                    .confirmOrder-cartItem-img-container {
                        height: 350px;
                        width: 100px;
                        margin-top: 15px;
                        margin-left: 15px;
                        border-radius: 10px;
                    }
                    
                    .confirmOrder-cartItem-img {
                        height: 150px;
                        width: 100%;
                    }
                    
                    .confirmOrder-cartItem-details-container {
                        margin-left: 200px;
                        position: relative;
                        bottom: 50px;
                    }
                    
                    .confirmOrder-cartItem-name {
                        font-size: 13px;
                        font-weight: 680;
                    }
                    
                    .confirmOrder-cartItem-price {
                        position: relative;
                        left: 150px;
                        bottom: 7x;
                        color: #525050;
                        font-size: 13px;
                        font-weight: 500;
                    }
                    table {
                        width: 100%;
                      }
                      td, th {
                        border: 1px solid #dddddd;
                        text-align: left;
                        padding: 8px;
                      }
                      
                      tr:nth-child(even) {
                        background-color: #dddddd;
                      }
                    `}
                </style>
                <div className='confirmOrder'>
                    <div className='invoice-title'>Invoice</div>
                    <hr />
                    <div style={{ fontWeight: 680, fontSize: '15px' }} className='mt-4'>Shipping Details:</div>
                    <div style={{ fontSize: '13px' }} className='mt-2'><span style={{ fontWeight: 680 }}>Shipping Address: </span>{shippingInfo.street}, {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country} - {shippingInfo.postalCode}</div>
                    <div style={{ fontSize: '13px' }}><span style={{ fontWeight: 680 }}>Contact Number: </span>{shippingInfo.phone}</div>
                    <hr />
                    <div style={{ fontWeight: 680, fontSize: '15px' }}>Ordered Items are:</div>
                    {cartItems && cartItems.map((cartItem) => (
                        <div className='confirmOrder-cartItem-container' key={cartItem.id}>
                            <div className='confirmOrder-cartItem-img-container'>
                                <img className='confirmOrder-cartItem-img' src={cartItem.img} alt={cartItem.productName} />
                            </div>
                            <div className='confirmOrder-cartItem-details-container'>
                                <div className='confirmOrder-cartItem-name'>{cartItem.productName}</div>
                                <div className='confirmOrder-cartItem-price'>{cartItem.quantity} X ${cartItem.price} = ${cartItem.quantity * cartItem.price}</div>
                            </div>
                        </div>
                    ))}
                    <table>
                        <thead>
                            <tr>
                                <td className='oder-title'>Order Summary</td>
                            </tr>
                            <tr style={{ fontWeight: 680, fontSize: '14px' }}>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        {cartItems && cartItems.map((cartItem) => (
                            <tbody key={cartItem.id}>
                                <tr style={{ fontWeight: 500, fontSize: '12px' }}>
                                    <td>{cartItem.productName}</td>
                                    <td>${cartItem.price}</td>
                                    <td>{cartItem.quantity} Item(s)</td>
                                    <td>${cartItem.quantity * cartItem.price}</td>
                                </tr>
                            </tbody>
                        ))}
                        <tbody>
                            <tr style={{ fontWeight: 500, fontSize: '12px' }}>
                                <td>
                                    Shipping
                                </td>
                                <td>
                                    ${shippingPrice}
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr style={{ fontWeight: 500, fontSize: '12px' }}>
                                <td>Final Amount to Pay</td>
                                <td>${finalPrice}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </body>
        </html>
    );

    const html = ReactDOMServer.renderToStaticMarkup(element);

    return (
        <Document>
            <Page>
                <Html>{html}</Html>
            </Page>
        </Document>
    );

}

export default Invoice;