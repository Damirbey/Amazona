import express from 'express';
import data from './data.js';

const app = express();
const port = process.env.PORT || 5000;

//GETTING ALL PRODUCTS
app.get('/api/products', (req, res) => {
  res.send(data.products);
});

//FETCHING SPECIFIC PRODUCT
app.get('/api/products/slug/:slug', (req, res) => {
  const foundProduct = data.products.find((x) => x.slug == req.params.slug);

  if (foundProduct) {
    res.send(foundProduct);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
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
