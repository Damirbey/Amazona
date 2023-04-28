import express from 'express';
import data from './data.js';

const app = express();
const port = process.env.PORT || 5000;

//GETTING ALL PRODUCTS
app.get('/api/products', (req, res) => {
  res.send(data.products);
});

//FETCHING SPECIFIC PRODUCT
app.get('/api/products/slug/:slugq', (req, res) => {
  const foundProduct = data.products.find((x) => x.slug == req.params.slug);

  if (foundProduct) {
    console.log('FOUND!', foundProduct);
    res.send(foundProduct);
  } else {
    console.log('not found');
    res.status(404).send({ message: 'Product Not Found' });
  }
});

//RUNNING THE SERVER
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
