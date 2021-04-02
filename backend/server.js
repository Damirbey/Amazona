import express from "express";
import products from "./data.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.send("Server is running");
});

app.get("/api/products",(req,res)=>{
    res.send(products);
});

app.get('/api/products/:id',(req,res)=>{
    const product = products.find((x) => x._id === Number(req.params.id));
    if(product)
    {
        res.send(product);
    }
    else
    {
        res.status(404).send({message:"Product not Found"});
    }
})


app.listen(PORT,()=>{
    console.log("Application is running on Port " + PORT);
})