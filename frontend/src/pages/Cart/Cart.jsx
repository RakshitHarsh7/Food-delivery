import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalAmountCart, url } = useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p className='text-white'>Items</p>
          <p className='text-white'>Title</p>
          <p className='text-white'>Price</p>
          <p className='text-white'>Quantity</p>
          <p className='text-white'>Total</p>
          <p className='text-white'>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className="cart-items-title cart-items-item">
                  <img src={url+"/images/"+item.image} alt="" />
                  <p className="text-white">{item.name}</p>
                  <p className="ml-1 text-white">$ {item.price}</p>
                  <p className="ml-5 text-white">{cartItems[item._id]}</p>
                  <p className="ml-1 text-white">$ {item.price * cartItems[item._id]}</p>
                  <div className="mr-12 bg-red-500 flex items-center justify-center rounded-full w-15">
                  <IconButton  onClick={() => removeFromCart(item._id)} aria-label="delete" size="large" >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                  </div>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2 className="text-white">Cart Total</h2>
          <div>
          <div className="cart-total-details">
              <p className="text-white">Subtotal</p>
              <p  className="text-white">$ {getTotalAmountCart()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p className="text-white">Delivery fee</p>
              <p className="text-white">$ {getTotalAmountCart() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p className="text-white">Total</p>
              <p className="text-white">$ {getTotalAmountCart() === 0 ? 0 : getTotalAmountCart() + 2}</p>
            </div>
          </div>
          <button onClick={()=> navigate('/order')}>Proceed to Checkout</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Enter promo code" />
              <button>Submit</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
