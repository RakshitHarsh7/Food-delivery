import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios'
import {StoreContext} from '../../context/StoreContext'

const Verify = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const {url} = useContext(StoreContext)
    const navigate = useNavigate();

    console.log(success, orderId);

    const verifyPayment = async () => {

      const response = await axios.post(url+"/api/order/verify", {success, orderId});

      if(response.data.success) {

        navigate('/myorders');
      }
      else{
        navigate('/');
      }
    }

    useEffect(() => {
      verifyPayment();
    }, [])

  return (
  
    <Box sx={{ display: 'flex',
        justifyContent: 'center',  // Centers horizontally
        alignItems: 'center',      // Centers vertically
        height: '60vh', }}>
      <CircularProgress size={80} sx={{color: 'tomato'}}  />
    </Box>
  )
}

export default Verify