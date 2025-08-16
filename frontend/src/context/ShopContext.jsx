import React,{createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const [search,setsearch] = useState('');
    const [searchvisible,setsearchvisible] = useState(false);
    const [cartitems,setcartitems] = useState({});

    const addtocart = async (itemId,size) => {
        if(!size){
            toast.error("Select Product Size");
        }
        else{
            let cartData = structuredClone(cartitems);
            if(cartData[itemId]){
                if(cartData[itemId][size]){
                    cartData[itemId][size]+=1;
                }
                else{
                    cartData[itemId][size] = 1;
                }
            }
            else{
                cartData[itemId] = {}
                cartData[itemId][size] = 1;
            }
            setcartitems(cartData);
        }
    }

    const getcartcount = () => {
       let totalcount = 0;
       for(const items in cartitems){
        for(const item in cartitems[items]){
            try {
              if(cartitems[items][item] > 0){
                totalcount+=cartitems[items][item];
              }
            } catch (err) {
                toast.error("Product Not Added to Cart");
            }
        }
       }
       return totalcount;
    }

    const updateQuantity = async(itemId,size,quantity) => {
        let cartdata = structuredClone(cartitems);
        cartdata[itemId][size] = quantity;
        setcartitems(cartdata);
    }
    
    const getCartAmount = () => {
        let totalAmount = 0;
        for(const items in cartitems){
           let iteminfo = products.find((item)=> item._id === items);
           let price = iteminfo.price;
           for(const item in cartitems[items]){
              try {
                if(cartitems[items][item] > 0){
                    totalAmount+=iteminfo.price * cartitems[items][item];
                }
              } catch (error) {
                
              }
           }
        }
        return totalAmount;
    }

    const value = {
       products,
       currency,
       delivery_fee,
       search,
       searchvisible,
       setsearch,
       setsearchvisible,
       cartitems,
       addtocart,
       getcartcount,
       updateQuantity,
       getCartAmount,

    } 
    
    return (
        <ShopContext.Provider value = {value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;