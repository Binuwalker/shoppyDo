import React, { useEffect, useState } from 'react';
import { firebaseData } from '../../firebase/config';
import '../../styles/Home.css';
import { useNavigate } from 'react-router';
import { Snackbar, Alert } from '@mui/material';
import Loading from '../plugins/Loading';
import { onSnapshot, query, collection } from 'firebase/firestore';
const q = query(collection(firebaseData, 'products'));

const Home = () => {

    const [products, setProducts] = useState();
    const [alert, setAlert] = useState();
    const navigate = useNavigate();

    const handleProduct = (id) => {
        navigate(`/product/${id}`)
    }

    const LOCAL_STORAGE_KEY = "cart-list"

    const [cartItems, setCartItems] = useState(() => {
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []
    });
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
    }, [cartItems]);

    const handleAddToCart = (id, productName, price, img, quantity = '1') => {
        const existingItem = cartItems.find(item => item.id === id)
        console.log(id)
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
    }, [alert])

    useEffect(() => {
        onSnapshot(q, (snapshot) => {
            setProducts(snapshot.docs.map(doc => ({
              id: doc.id,
              item: doc.data()
            })));
          })
    },[products])

    return (
        <>
            {products ? (
                <div className='home'>
                    <div className='container'>
                        <div className='products'>
                            {products && products.map((product) => (
                                <div className='product' key={product.id}>
                                    <div className='container'>
                                        <div className='product-img-container' onClick={() => handleProduct(product.id)}><img className='product-img' src={product.item.img} alt={product.item.productName} /></div>
                                        <div className='product-name'>{product.item.productName}</div>
                                        <div className='product-price'>${product.item.price}</div>
                                        <button className='addToCart-btn' onClick={() => handleAddToCart(product.id, product.item.productName, product.item.price, product.item.img)}>Add To Cart</button>
                                        <button className='buyNow-btn' onClick={() => handleProduct(product.id)}>Buy Now</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='alert-msg'>
                        <div className='container'>
                            <Snackbar
                                open={alert}
                                anchorOrigin={
                                    {
                                        horizontal: 'center',
                                        vertical: 'top'
                                    }
                                }
                                transitionDuration={1500}
                            >
                                <Alert severity='success' onClose={() => setAlert(false)}>
                                    Item added successfully!
                                </Alert>
                            </Snackbar>
                        </div>
                    </div>
                </div>
            ) : (
                <Loading />
            )}

        </>
    )
}

export default Home;