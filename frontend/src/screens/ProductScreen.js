import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import Rating from "../components/Rating";

function ProductScreen(props)
{
    const dispatch=useDispatch();
    const productID = props.match.params.id;
    const productListDetails = useSelector((state)=>state.productDetailsList);
    const {loading,error,product} = productListDetails;

    useEffect(()=>{
        dispatch(listProductDetails(productID));
    },[dispatch,productID])
   
    
        return (
            
            <div>
            {
            loading?
            <LoadingBox/>
            : error? <MessageBox variant="danger">{error}</MessageBox>
            :<div className="row top">          
                <div className="col-2">
                
                    <img className="large"  src={product.image} alt ={product.description} />
                    
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
            }
            </div>
         
                
        )
   
}

export default ProductScreen;