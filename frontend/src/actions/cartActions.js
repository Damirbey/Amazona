import Axios from "axios"
import { CART_ADD_ITEM } from "../constants/cartConstant";

export const addToCart=(productID,qty)=>async(dispatch,getState)=>{
    const {data} = await Axios.get(`/api/products/${productID}`);
    dispatch({
        type:CART_ADD_ITEM,
        payload:{
            name:data.name,
            image:data.image,
            price:data.price,
            countInStock: data.countInStock,
            product:data._id,
            qty
        }
    });
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
}