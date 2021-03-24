import React from "react";
import products from "../data";
import Rating from "../components/Rating";

function ProductScreen(props)
{
    const product = products.find((x)=>x._id ===Number(props.match.params.id));
   
    if(!product)
    {
        return (
            <div>Product is not found.</div>
        )
    }
    
        return (
            
            <div className="row top">          
                    <div className="col-2">
                    
                        <img className="large" src={product.image} alt ={product.description} />
                        
                    </div>
                    <div className="col-1">
                        <ul>
                            <li className="productName">{product.name}</li>
                            <li className="rating">
                                <Rating rating={product.rating} numOfReviews = {product.numOfReviews}/>
                            </li>
                            <li>Price: $ {product.price}</li>
                            <li>Description:</li>
                            <li>{product.description}</li>
                        </ul>
                    </div>
                    <div className="col-1">
                        <div className="card card-body">
                            <ul>
                                <li className="row">
                                    <div>Price</div>
                                    <div>$ {product.price}</div>
                                </li>
                                <li className="row">
                                    <div>Status</div>
                                   {product.countInStock>=1?
                                    <div className="inStock">In Stock</div>
                                    :<div className="unavailable">Unavailable</div>} 
                                </li>
                                <li>
                                    <button className="block primary" type="button">Add to Cart</button>
                                </li>
                            </ul> 
                        </div>
                                              
                    </div>
                </div>

                
        )
  
   
}

export default ProductScreen;