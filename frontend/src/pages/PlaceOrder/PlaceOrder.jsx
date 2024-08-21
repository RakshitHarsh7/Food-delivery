import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import './PlaceOrder.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {

  const {getTotalAmountCart, token, food_list, cartItems, url} = useContext(StoreContext);

  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onchangeHandler = (event) => {

    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data, [name]:value}));
  }

  const placeOrder = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Initialize an array to store the items in the order
    let orderItems = [];

    // Iterate over each item in the food list
    food_list.map((item) => {
        // Check if the item is in the cart (i.e., quantity > 0)
        if (cartItems[item._id] > 0) {
            // Copy the item information
            let itemInfo = item;

            // Add the quantity of this item from the cart to the item info
            itemInfo["quantity"] = cartItems[item._id];

            // Add this item with its quantity to the orderItems array
            orderItems.push(itemInfo);
        }
    });

    // Create an object containing the order details
    let orderData = {
        address: data, // User's address data
        items: orderItems, // List of items in the order with quantities
        amount: getTotalAmountCart() + 2, // Total order amount including a fixed additional charge
    };

    try {
        // Send a POST request to the server to place the order
        let response = await axios.post(url + "/api/order/place", orderData, {
            headers: { token }, // Include the user's token for authentication
        });

        // If the order was successful, redirect the user to the payment session URL
        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url);
        } else {
            // If the order was not successful, alert the user
            alert("Error");
        }
    } catch (error) {
        // Handle any errors that occur during the request
        console.error("Error placing order:", error);
        alert("There was an error processing your order. Please try again.");
    }
};

useEffect(() => {
    if(!token){
      navigate('/cart')
    }
    else if(getTotalAmountCart() === 0){
      navigate('/cart')
    }
}, [token])


  // useEffect(() => {
  //   console.log(data);
  // }, [data])

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title text-white">Delivery Information</p>
        <div className="multi-fields">
          <input required name="firstName" onChange={onchangeHandler} value={data.firstName} type="text" placeholder="First Name" />
          <input required name="lastName" onChange={onchangeHandler} value={data.lastName} type="text" placeholder="Last Name" />
        </div>
        <input required name="email" onChange={onchangeHandler} value={data.email} type="text" placeholder="Email" />
        
        <input required name="street" onChange={onchangeHandler} value={data.street} type="text" placeholder="Street" />
        
        <div className="multi-fields">
          <input required name="city" onChange={onchangeHandler} value={data.city} type="text" placeholder="City" />
          <input required name="state" onChange={onchangeHandler} value={data.state} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
        
          <input required name="zipcode" onChange={onchangeHandler} value={data.zipcode} type="text" placeholder="Zip Code" />
          <input required name="country" onChange={onchangeHandler} value={data.country} type="text" placeholder="Country" />
        </div>
        <input required name="phone" onChange={onchangeHandler} value={data.phone} type="text" placeholder="Phone" />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2 className="text-white">Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p className="text-white">Subtotal</p>
              <p className="text-white">$ {getTotalAmountCart()}</p>
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
          <button type="submit">
            Proceed to Payment
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
