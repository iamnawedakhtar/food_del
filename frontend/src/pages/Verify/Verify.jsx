import './Verify.css'
import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {StoreContext } from '../../context/StoreContext'
import axios from 'axios'

function Verify() {
    const { url } = useContext(StoreContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
  
    const navigate = useNavigate();
  
    const verifyPayment = async () => {
      console.log("verify payment par call jaa rhi hai ")
      const response = await axios.post(url + "/api/order/verify", { success, orderId });
      if (response.data.success) {
        console.log("payment success ho gyi ")
        navigate("/myorders");
      }
      else {
        console.log("payment failed")
        navigate("/")
      }
    }
  
    useEffect(() => {
      verifyPayment();
    }, [])
  
    return (
      <div className='verify'>
        <div className="spinner"></div>
      </div>
  )
}

export default Verify
