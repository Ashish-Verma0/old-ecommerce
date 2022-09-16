import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getFetch } from "../api/Api";

export const Store = createContext({
  getEmail: () => {},
  email: "",
  user: "",
  stripeApiKey: "",
  setShippingDetails: () => {},
  shippingDetails: "",
});

const Data = (props) => {
  const [shippingDetails, setShippingDetails] = useState([]);

  const [email, setEmail] = useState("");
  const getEmail = (data) => {
    return setEmail(data);
  };

  const [user, setUser] = useState({});

  const getUserData = async () => {
    try {
      const res = await getFetch("http://localhost:8084/api/v1/me");
      setUser(res.user);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getUserData();
    getStripeApiKey();
  }, []);

  const [stripeApiKey, setStripeApiKey] = useState("");

  const getStripeApiKey = async () => {
    try {
      const res = await axios.get("http://localhost:8084/api/v1/stripeApiKey");
      setStripeApiKey(res.data.stripeApiKey);
      console.log(res.data.stripeApiKey);
    } catch (error) {
      console.log(error.response);
    }
  };


  return (
    <Store.Provider
      value={{
        getEmail,
        email,
        user,
        stripeApiKey,
        setShippingDetails,
        shippingDetails,
      }}
    >
      {props.children}
    </Store.Provider>
  );
};

export default Data;
