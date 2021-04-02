import React,{useEffect} from "react";
import {listProducts} from "../actions/productActions";
import Product from "../components/Product";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import { useSelector, useDispatch } from "react-redux";


function HomeScreen()
{
    const dispatch = useDispatch();
    const productList = useSelector((state)=>state.productList);
    const {loading,error,products} = productList;
    useEffect(()=>{
       dispatch(listProducts());

    },[dispatch]);
    console.log(error);    
    return(
        <div>
            {
            loading?
            <LoadingBox/>
            : error? <MessageBox variant="danger">{error}</MessageBox>
            :<div className="row center">
                {products.map((product)=>(
                    <Product key={product._id} product={product}/>
                ))}           
            </div>
            }
        </div>
                
    )
}

export default HomeScreen;