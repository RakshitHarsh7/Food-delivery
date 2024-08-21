import React, {useContext, useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';

const LoginPopUp = ({setShowLogin}) => {

    const [currState, setCurrState] = useState("Sign Up")

    const {url, setToken} = useContext(StoreContext);

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {

        const name = event.target.name;
        const value = event.target.value

        setData(data=>({...data, [name]:value})) 
    }

    const onLogin = async (event) => {

        event.preventDefault();

        let newUrl = url;
        if(currState === "Login"){
            newUrl += "/api/user/login"
        }
        else{
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl, data);

        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            setShowLogin(false);
        }
        else{
            alert(response.data.message)
        }

    }

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className='login-popup-container'>
            <div className='login-popup-title'>
                <h2 className='text-white text-3xl'>{currState}</h2>
                <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className='login-popup-inputs'>
                {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Name' required />}
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' required />
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
            </div>
            <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
            <div className='login-popup-condition'>
                <input className='accent-[tomato]' type="checkbox" required />
                <p className='text-gray-600'>By continuing, I agree to the terms of use and privacy policy.</p>
            </div>
            {currState === "Login"
            ? <p className='text-gray-600'>Create a new account ? <span className='text-[tomato] cursor-pointer font-medium' onClick={() => setCurrState('Sign Up')}>Click here</span></p>
            : <p className='text-gray-600'>Already have an account ? <span className='text-[tomato] cursor-pointer font-medium' onClick={() => setCurrState('Login')}>Login here</span></p>
            }
            
            
        </form>
    </div>
  )
}

export default LoginPopUp