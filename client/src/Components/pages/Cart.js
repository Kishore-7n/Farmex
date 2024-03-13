

import React from 'react'
import '../styles/Cart.css';
import {useDispatch, useSelector } from 'react-redux';
import { useContext} from 'react';
import { decreament, addtocart } from '../../redux/CartSlice';
import { UserContext } from '../../Context/UserContext';
import { removecart } from '../../redux/CartSlice';
import { clearCart } from '../../redux/CartSlice';
import  gif from '../img/empty_cart.jpg';
import { Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
export default function Cart() {

    const cartitems =  useSelector((state) => state.cart.cartitems)
    const {userData} = useContext(UserContext);
    const navigate = useNavigate();

   
 

    const dispatch = useDispatch()
    const totalPrice = cartitems.reduce(
        (total, cartitem) => total + cartitem.Price * cartitem.cartquantity,
        0
      );
    const handlecheckout = async(cartitems) =>
    {
        const checkout =  await fetch('https://farmex.onrender.com/create-checkout-session',{
            method:'post',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                cartitems,
                userid:userData._id
            })
        })
        

        const checkout_response = await checkout.json();
        window.location.href = checkout_response.url;


    }

  return (
    <div className='cart-container'>
      {cartitems.length === 0 ? (
        <div className='cart-empty'>
            <img src={gif} alt='gif' width={600} style={{height:500}}></img>
            <h5>  Your Cart is Empty !!!</h5>
            <Button variant='contained' onClick={()=>navigate('/product')} sx={{width:300,height:45}}>shop</Button>
        </div>
      ):(
        <div>
            <div className='titles'>
                <h3 className='product-title'>Product</h3>
                <h3 className='price'>Price</h3>
                <h3 className='Quantity'>Quantity</h3>
                <h3 className='total'>Total</h3>
            </div>
            <div className='cart-items'>
                {cartitems.map(cartitem=>(
                    <div className='cart-item' key={cartitem._id}>
                        <div className='cart-product'>
                            <img src={cartitem.Image.url} alt={cartitem.ProductName}></img>
                            <div>
                                <h3>{cartitem.ProductName}</h3>
                                <button onClick={()=>dispatch(removecart(cartitem._id))}>Remove</button>
                            </div>
                        </div>
                        <div className='cart-product-price'>
                        &#x20B9;{cartitem.Price}
                        </div>
                        <div className='cart-product-quantity'>
                            <button onClick={()=>dispatch(decreament(cartitem))} className='inbtn'> - </button>
                            <div className='count'>{cartitem.cartquantity}</div>
                            <button onClick={()=> dispatch(addtocart(cartitem))} className='inbtn'> + </button>
                        </div>
                        <div className='cart-product-total-price'>
                            &#x20B9;{cartitem.Price * cartitem.cartquantity}
                        </div>
                    </div>
                ))}
                <div className='cart-summary'>
                    <button className='clear-cart' onClick={()=>dispatch(clearCart())}>clear cart</button>
                    <div className='cart-checkout'>
                        <div className='subtotal'>
                            <span>Subtotal</span>
                            <span className='amount'>&#x20B9; {totalPrice}</span>
                            <p>Taxes and shipping calculated at checkout</p>
                            <Button variant='contained' onClick={()=>handlecheckout(cartitems)}>CHECKOUT</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
</div>
  )
}

