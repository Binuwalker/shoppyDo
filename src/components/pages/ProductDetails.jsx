import React, { useEffect, useState } from 'react';
import '../../styles/ProductDetails.css';
import { firebaseData } from '../../firebase/config';
import { useParams } from 'react-router';
import { Snackbar, Alert, } from '@mui/material';
import Loading from '../plugins/Loading';
import { doc, getDoc } from 'firebase/firestore';

const ProductDetails = () => {

    const [product, setProduct] = useState();
    const [alert, setAlert] = useState();
    const [snap, setSnap] = useState();
    const { id } = useParams();

    const LOCAL_STORAGE_KEY = "cart-list"

    const [cartItems, setCartItems] = useState(() => {
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []
    });
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
    }, [cartItems]);

    const handleAddToCart = (id, productName, price, img, quantity = '1') => {
        const existingItem = cartItems.find(item => {
            return (item.id === id)
        })
        console.log(existingItem);
        if (existingItem) {
            existingItem.quantity += parseInt(quantity);
            setCartItems([...cartItems]);
            setAlert(true)
        } else {
            setCartItems([...cartItems, { id, productName, price, img, quantity: parseInt(quantity) }]);
            setAlert(true)
        }
    };

    useEffect(() => {
        if (alert) {
            setTimeout(() => {
                setAlert(false)
            }, 1500)
        }
    })

    useEffect(() => {
        const asyncFunc = async () => {
            const userDocRef = doc(firebaseData, "products", id);
            setSnap(await getDoc(userDocRef));
            setProduct(snap?.data())
        }
        asyncFunc();
    }, [id, snap])

    return (
        <>
            {product ? (
                <div className='productDetails'>
                    <div className='container'>
                        {product === undefined ? (null) : (
                            <div className='productDetails-containers'>
                                <div className='productDetails-container-1'>
                                    <div className='container'>
                                        <div className='productDetails-img-container'>
                                            <img className='productDetails-img' src={product.img} alt={product.productName} />
                                        </div>
                                    </div>
                                </div>
                                <div className='productDetails-container-2'>
                                    <div className='container'>
                                        <div className='productDetail-id'>{product.id}</div>
                                        <div className='productDetail-name'>{product.productName}</div>
                                        <div className='productDetail-detail'>{product.detail}</div>
                                        <div className='productDetail-price'>${product.price}</div>
                                        <button className='productDetail-addToCart-btn' onClick={() => handleAddToCart(id, product.productName, product.price, product.img, product.quantity)}>Add To Cart</button>
                                        <button className='productDetail-buyNow-btn'>Buy Now</button>
                                    </div>
                                </div>
                            </div>)}

                    </div>
                    <Snackbar
                        open={alert}
                        anchorOrigin={
                            {
                                horizontal: 'center',
                                vertical: 'top'
                            }
                        }
                        transitionDuration={1500}
                        onClose={() => setAlert(false)}
                    >
                        <Alert severity='success' onClose={() => setAlert(false)}>
                            Item added successfully!
                        </Alert>
                    </Snackbar>
                </div>
            ) : (
                <Loading />
            )}


        </>
    )
}

export default ProductDetails