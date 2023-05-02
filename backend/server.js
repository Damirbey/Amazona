import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

//LOADING .env file variables
dotenv.config();

//CONNECTING TO MONGO Database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('CONNECTED TO MONGO DB');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
const port = process.env.PORT || 5000;

//GETTING ALL PRODUCTS
app.get('/api/products', (req, res) => {
  res.send(data.products);
});

//FETCHING SPECIFIC PRODUCT USING IT'S SLUG PROPERTY
app.get('/api/products/slug/:slug', (req, res) => {
  const foundProduct = data.products.find((x) => x.slug == req.params.slug);

  if (foundProduct) {
    res.send(foundProduct);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
//FETCHING SPECIFIC PRODUCT USING IT'S ID
app.get('/api/products/:id', (req, res) => {
  const foundProduct = data.products.find((x) => x._id == req.params.id);
  if (foundProduct) {
    res.send(foundProduct);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

//RUNNING THE SERVER
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
