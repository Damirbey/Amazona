import React from "react";

function CartScreen(props){
    const productID = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split('=')[1]):1;

    return(
    <div>
        <h1>Cart Screen</h1>
        <p>
            Product ID : {productID} Quantity : {qty}
        </p>
    </div>)
}

export default CartScreen;