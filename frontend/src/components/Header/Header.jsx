import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
      <div className='header-contents'>
        <h2>Order your favourite food here!</h2>
        <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingrediants and culinary expertise.Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
        <button className='border-none text-[#747474] font-medium px-6 py-3 bg-white text-sm rounded-full'>View Menu</button>
      </div>
    </div>
  )
}

export default Header