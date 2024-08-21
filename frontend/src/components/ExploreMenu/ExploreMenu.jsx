import React from 'react'
import './ExploreMenu.css'

import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1 className='text-white font-medium text-3xl'>Explore Our Menu</h1>
        <p className='explore-menu-text text-white'>The Explore Menu section offers a tantalizing array of culinary delights, showcasing a diverse range of cuisines and dishes. Browse through curated menus from top-rated restaurants, discover new favorites, and satisfy your cravings with just a few clicks.</p>
        <div className='explore-menu-list'>
            {menu_list.map((item, index) => {

                return (
                    <div onClick={() => setCategory(prev=>prev === item.menu_name ? "All" : item.menu_name)} key={index} className='explore-menu-list-item'>
                        <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu