import React from "react";
import products from "../data";
import Product from "../components/Product";

function HomeScreen()
{
    return(
        <div className="row center">
                {products.map((product)=>(
                    <Product key={product._id} product={product}/>
                ))}           
        </div> 
    )
}

export default HomeScreen;