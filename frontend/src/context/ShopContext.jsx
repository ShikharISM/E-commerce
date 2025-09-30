import React, { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setsearch] = useState("");
  const [searchvisible, setsearchvisible] = useState(false);
  const [cartitems, setcartitems] = useState({});
  const [token, settoken] = useState("");
  const [userId, setuserId] = useState("");

  // addtocart
  const addtocart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartitems || {});
    if (cartData[itemId]) cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    else cartData[itemId] = { [size]: 1 };

    setcartitems(cartData);

    const storedToken = token || localStorage.getItem("token");
    if (storedToken) {
      try {
        const response = await axios.post(
          backendUrl + '/api/cart/add',
          { itemId, size },
          { headers: { token: storedToken } }
        );
        // sync with backend response if necessary
        if (response.data && response.data.cartData) {
          setcartitems(response.data.cartData);
        }
      } catch (error) {
        console.log("addtocart error:", error);
        toast.error(error?.response?.data?.message || error.message);
      }
    } else {
      // optional: persist guest cart in localStorage
      localStorage.setItem("cart", JSON.stringify(cartData));
    }
  };

  const updateCart = async (itemId, size, quantity) => {
   let cartData = structuredClone(cartitems || {});
    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = quantity;

    setcartitems(cartData);
    console.log('updating...')
    const storedToken = token || localStorage.getItem("token");

    if (storedToken) {
      try {
        const response = await axios.post(
          backendUrl + '/api/cart/update',
          { itemId, size, quantity },
          { headers: { token: storedToken } }
        );
        if (response.data && response.data.cartData) {
          setcartitems(response.data.cartData);
        }
      } catch (error) {
        console.log("updateQuantity error:", error);
        toast.error(error?.response?.data?.message || error.message);
      }
    } else {
      localStorage.setItem("cart", JSON.stringify(cartData));
    }
  };

  // getUserCart accepts optional params to avoid race with setState
  const getUserCart = async (token) => {

    try {
      const response = await axios.post(
        backendUrl + '/api/cart/get',
        {},
        { headers: { token } }
      )
      if (response.data.success) {
        setcartitems(response.data.cartData || {});
      }
    } catch (error) {
      console.log("getUserCart error:", error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };


  // counts and amount
  const getcartcount = () => {
    let totalcount = 0;
    for (const itemId in cartitems) {
      for (const size in cartitems[itemId]) totalcount += cartitems[itemId][size];
    }
    return totalcount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartitems) {
      const product = products.find((p) => p._id === itemId);
      if (!product) continue;
      for (const size in cartitems[itemId]) totalAmount += product.price * cartitems[itemId][size];
    }
    return totalAmount;
  };

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      settoken(localStorage.getItem("token"))
      getUserCart(localStorage.getItem("token"))
    }
  }, [])

  // On mount, read stored token/userId and fetch cart (call getUserCart with stored values)
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      settoken(storedToken);
      // call getUserCart with stored values to avoid setState race
      getUserCart(storedToken);
    } else {
      // load guest cart if exists
      const guest = localStorage.getItem("guest_cart");
      if (guest) setcartitems(JSON.parse(guest));
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    searchvisible,
    setsearch,
    setsearchvisible,
    cartitems,
    setcartitems,
    addtocart,
    updateCart,
    getcartcount,
    getCartAmount,
    token,
    settoken,
    backendUrl,
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
