import React from "react";
import Rating from "./Rating";

function Product(props)
{
    const {product} = props;
    return(
        <div className="card" key={product._id}>
                     
            <a href={`/product/${product._id}`}><img src={product.image} alt={product.description} className="medium"/></a>

                <div className="card-body">

                    <a href={`/product/${product._id}`}>{product.name}</a>

                    <Rating rating={product.rating} numOfReviews={product.numOfReviews}/>

                    <div className="price">
                       $ {product.price}
                    </div>
                    
                </div>
        </div>
    );
}

export default Product;