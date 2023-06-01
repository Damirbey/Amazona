import express from 'express';
import Product from '../models/productModel.js';
import expressAsyncHandler from 'express-async-handler';

const productRouter = express.Router();

//RETURNING ALL PRODUCTS
productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});
//FETCHING PRODUCT CATEGORY
productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
  })
);
productRouter.get('/slug/:slug', async (req, res) => {
  const foundProduct = await Product.findOne({ slug: req.params.slug });

  if (foundProduct) {
    res.send(foundProduct);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

productRouter.get('/:id', async (req, res) => {
  const foundProduct = await Product.findById(req.params.id);
  if (foundProduct) {
    res.send(foundProduct);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

export default productRouter;
