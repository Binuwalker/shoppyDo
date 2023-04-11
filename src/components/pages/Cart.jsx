import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import '../../styles/Cart.css';
import { HiTrash } from 'react-icons/hi';
import { useNavigate } from 'react-router';

const Cart = () => {

  const navigate = useNavigate();

  let [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart-list")) || [];
    setCartItems(items);

  }, []);

  const handleClear = (id) => {
    const updatedItems = cartItems.length ? cartItems.filter(item => item.id !== id) : null;
    setCartItems(updatedItems);
    localStorage.setItem("cart-list", JSON.stringify(updatedItems));
  }

  const increaseItemQuantity = (id) => {
    const updatedItems = cartItems.map(cartItem => {
      if (cartItem.id === id) {
        const quantity = parseInt(cartItem.quantity) || 0
        cartItem.quantity = quantity + 1
      }
      return cartItem;
    })
    setCartItems(updatedItems);
    localStorage.setItem("cart-list", JSON.stringify(updatedItems));
  }

  const decreaseItemQuantity = (id) => {
    const updatedItems = cartItems.map(cartItem => {
      if (cartItem.id === id) {
        const quantity = parseInt(cartItem.quantity)
        cartItem.quantity = quantity - 1
      }
      return cartItem
    }).filter(cartItem => cartItem.quantity > 0);
    setCartItems(updatedItems);
    localStorage.setItem("cart-list", JSON.stringify(updatedItems));
  }

  return (
    <>
        <div className='cart'>
          <div className='container'>
            {cartItems && cartItems.map((cartItem) => (
              <div className='cartItem-container' key={cartItem.id}>
                <div className='cartItem-img-container' onClick={() => navigate(`/product/${cartItem.id}`)}>
                  <img className='cartItem-img' src={cartItem.img} alt={cartItem.productName} />
                </div>
                <div className='cartItem-details-container'>
                  <div className='cartItem-name'>{cartItem.productName}</div>
                  <div className='cartItem-price'>${cartItem.price}</div>
                  <div className='cartItem-quantity-container'>
                    <div className='cartItem-decreaseQuantity' onClick={() => decreaseItemQuantity(cartItem.id)}>-</div>
                    <div className='cartItem-quantity'>{cartItem.quantity}</div>
                    <div className='cartItem-increaseQuantity' onClick={() => increaseItemQuantity(cartItem.id)}>+</div>
                  </div>
                  <HiTrash className='cartItem-trash' onClick={() => handleClear(cartItem.id)} />
                </div>
              </div>
            ))}
            {cartItems.length > 0 ?
            (
              <div className='oder-summary-container'>
                <Table striped bordered hover>
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
                      <td colSpan={3}>Final Amount to Pay</td>
                      <td><div>${cartItems.reduce((acc, cartItem) => (acc + cartItem.quantity * cartItem.price), 0)}</div></td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <td colSpan={4}>
                        <button className='checkout-btn' onClick={() => navigate('/shippinginfo')}>Check Out</button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              ) : (
                <div>Cart Item is Empty</div>
              )}
          </div>
        </div>
    </>
  )
}

export default Cart