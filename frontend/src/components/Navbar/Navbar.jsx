import React, { useContext, useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setShowLogin}) => {

    const [menu, setMenu] = useState('Home')

    const navigate = useNavigate();

    const {getTotalAmountCart, token, setToken} = useContext(StoreContext);

    const logout = () => {

        localStorage.removeItem("token")
        setToken("");
        navigate('/')
    }



  return (
    <div className='navbar'>
        <Link to={'/'}><img src={assets.logo} alt="" className="logo" /></Link>
        <ul className='navbar-menu'>
            <Link to={'/'} onClick={() => setMenu('Home')} className={menu === 'Home' ? 'active' : 'text-white'}>Home</Link>
            <a href='#explore-menu' onClick={() => setMenu('Menu')} className={menu === 'Menu' ? 'active' : 'text-white'}>Menu</a>
            <a href='#app-download' onClick={() => setMenu('Mobile-App')} className={menu === 'Mobile-App' ? 'active' : 'text-white'}>Mobile-app</a>
            <a href='#footer' onClick={() => setMenu('Contact Us')} className={menu === 'Contact Us' ? 'active' : 'text-white'}>Contact Us</a>
        </ul>
        <div className='navbar-right'>
            <img src={assets.search_icon} alt="" />
            <div className='navbar-search-icon'>
                <Link to={'/cart'}><img src={assets.basket_icon} alt="" /></Link>
                <div className={getTotalAmountCart() === 0 ? "" : "dot"}></div>
            </div>

            {!token ? <button class="bg-red-500 text-white text-lg border border-red-500 px-8 py-2.5 rounded-full cursor-pointer transition duration-300 hover:bg-red-700" onClick={() => setShowLogin(true)}>Sign In</button>
            
            : 
            
            <div className='navbar-profile'>
                <img src={assets.profile_icon} alt="" />
                <ul className='nav-profile-dropdown'>
                    <li onClick={() => navigate('/myorders')}>
                        <img src={assets.bag_icon} alt="" />
                        <p className='text-white'>Orders</p>
                    </li>
                    <hr />
                    <li>
                        <img  src={assets.logout_icon} alt="" />
                        <p className='text-white' onClick={logout}>Logout</p>
                    </li>
                </ul>
            </div>
            }    
        </div>
    </div>
  )
}

export default Navbar