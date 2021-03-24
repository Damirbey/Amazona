import express from "express";
import products from "./data.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.send("Server is running");
});

app.get("/api/products",(req,res)=>{
    res.send(products);
})

app.listen(PORT,()=>{
    console.log("Application is running on Port " + PORT);
})