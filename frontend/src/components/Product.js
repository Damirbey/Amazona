import React from "react";
import Rating from "./Rating";
import {Link} from "react-router-dom";

function Product(props)
{
    const {product} = props;
    return(
        <div className="card" key={product._id}>
                     
            <Link to={`/product/${product._id}`}><img src={product.image} alt={product.description} className="medium"/></Link>

                <div className="card-body">

                    <Link to={`/product/${product._id}`}>{product.name}</Link>

                    <Rating rating={product.rating} numOfReviews={product.numOfReviews}/>

                    <div className="price">
                       $ {product.price}
                    </div>
                    
                </div>
        </div>
    );
}

export default Product;