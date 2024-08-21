import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../../../frontend/src/assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error('Error');
      }
    } catch (error) {
      toast.error('Error fetching orders');
    }
  };

  const statusHandler = async (event, orderId) => {

    const response = await axios.post(url+'/api/order/status', {
      orderId,
      status: event.target.value
    })

    if(response.data.success){
      await fetchAllOrders();
    }

  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div className="order-item" key={index}>
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <div>
                <p className="order-item-food">
                  {order.items?.map((item, itemIndex) => {
                    return itemIndex === order.items.length - 1
                      ? `${item.name} x ${item.quantity}`
                      : `${item.name} x ${item.quantity}, `;
                  })}
                </p>
                <p className='order-item-name'>
                    {order.address.firstName+" "+order.address.lastName}
                </p>
                <div className='order-item-address'>
                    <p>{order.address.street+","}</p>
                    <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
                </div>
                <p className='order-item-phone'>{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>$ {order.amount}</p>
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status} >
                <option value="Food Processing 📦">Food Processing 📦</option>
                <option value="Out for delivery 🚚">Out for delivery 🚚</option>
                <option value="Food delivered ✅">Food delivered ✅</option>
              </select>
            </div>
          ))
        ) : (
          <p>No orders available</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
