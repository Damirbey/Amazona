import React, { useEffect } from "react";
import {addToCart} from "../actions/cartActions";
import {useDispatch} from "react-redux";

function CartScreen(props){
    const productID = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split('=')[1]):1;
    const dispatch = useDispatch();
    useEffect(()=>{
        if(productID){
            dispatch(addToCart(productID,qty));
        }
    },[dispatch,productID,qty])
    return(
    <div>
        <h1>Cart Screen</h1>
        <p>
            Product ID : {productID} Quantity : {qty}
        </p>
    </div>)
}

export default CartScreen;