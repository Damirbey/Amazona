import express from 'express';
import Product from '../models/productModel.js';

const productRouter = express.Router();

//RETURNING ALL PRODUCTS
productRouter.get("/",async (req,res)=>{
    const products = await Product.find();
    res.send(products);
});

productRouter.get('/slug/:slug', async (req, res) => {
    const foundProduct = await Product.findOne({slug:req.params.slug});

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