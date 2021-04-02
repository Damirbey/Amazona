import { PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS } from "../constants/productConstants";
import { PRODUCT_LIST_REQUEST } from "../constants/productConstants";

import Axios from "axios";

const listProducts = ()=> async(dispatch)=>{
    dispatch({
        type:PRODUCT_LIST_REQUEST
    })
    try{
        const {data} = await Axios.get("/api/products");
        dispatch({type:PRODUCT_LIST_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:PRODUCT_LIST_FAIL,payload:err.message});
    }

}

export default listProducts;