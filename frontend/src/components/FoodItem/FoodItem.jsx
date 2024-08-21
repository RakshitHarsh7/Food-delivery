import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({id, name, price, description, image}) => {

    const {cartItems, addToCart, removeFromCart, url} = useContext(StoreContext);

  return (
    <div className='food-item'>
        <div className='food-item-img-container'>
            <img className='food-item-image' src={url+"/images/"+image} alt="" />

            {!cartItems[id]
                ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt=''/>
                : <div className='food-item-counter'>
                    <img src={assets.remove_icon_red} onClick={()=>removeFromCart(id)} alt="" />
                    <p className='text-black'>{cartItems[id]}</p>
                    <img src={assets.add_icon_green} onClick={()=>addToCart(id)} alt="" />
                </div>

            }
        </div>
        <div className='food-item-info'>
            <div className='food-item-name-rating'>
                <p className='text-xl font-medium text-white'>{name}</p>
                <img className='w-[70px]' src={assets.rating_starts} alt="" />
            </div>
            <p className='text-gray-400 text-xs'>{description}</p>
            <p className='text-[tomato] text-xl font-medium my-2.5'>${price}</p>
        </div>
    </div>
  )
}

export default FoodItem