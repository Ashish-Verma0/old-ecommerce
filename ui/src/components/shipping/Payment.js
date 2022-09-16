import React, { useContext, useEffect, useRef, useState } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Typography } from "@mui/material";
import { useCart } from "react-use-cart";
import "../shipping/Payment.css";
import { postFetchData } from "../../api/Api";
import { useNavigate } from "react-router-dom";
import { Store } from "../../useContext_Hook/Data";
const Payment = () => {
  const[orderItemData,setOrderItemData]=useState([])
    const{shippingDetails}=useContext(Store)
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { cartTotal,items } = useCart();
  const paymentData = {
    amount: Math.round(cartTotal * 100),
  };
  useEffect(()=>{
    items.map((elem)=>{
    console.log(elem)
     setOrderItemData(elem);
    })

  },[orderItemData])
  console.log(orderItemData.name)
const order={
    shippingInfo:{
      address:shippingDetails.address,
      city:shippingDetails.city,
      state:shippingDetails.state,
      country:shippingDetails.country,
      pinCode:shippingDetails.pinCode,
      phoneNo:shippingDetails.phoneNo
    },
    orderItems:items,
    itemPrice:cartTotal,
    taxPrice:20,
    shippingPrice:250,
    totalPrice:cartTotal
}
  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
      const {data} = await postFetchData(
        "http://localhost:8084/api/v1/payment/process",
        paymentData
      );
      console.log(data)
      const client_secret = data.client_secret;

      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: "Ashish Verma",
            email: "av84770@gmail.com",
            address:{
                line1:"E-157 eldeco colony udyan 2",
                city:"lucknow",
                state:"uttar pradesh",
                postal_code:"226025",
                country:"IN"
            }
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
      } else {
        if (result.paymentIntent.status === "succeeded") {
            order.paymentInfo={
                id:result.paymentIntent.id,
                status:result.paymentIntent.status
            }
            const res=await postFetchData("http://localhost:8084/api/v1/order/new",order)
            console.log(res)
          navigate("/success");
        } else {
          console.log("There is some issue");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      console.log(error.response.data.message);
    }
  };
  return (
    <>
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`pay ${cartTotal}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </>
  );
};

export default Payment;
