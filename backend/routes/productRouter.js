import express from 'express';
import Product from '../models/productModel.js';
import expressAsyncHandler from 'express-async-handler';
import { isAdmin, isAuth } from '../utils.js';

const productRouter = express.Router();

//RETURNING ALL PRODUCTS
productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});
//CREATING A PRODUCT
productRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newProduct = new Product({
      name: 'sample name ' + Date.now(),
      slug: 'sample-name-' + Date.now(),
      image: '/images/p1.jpeg',
      price: 0,
      category: 'sample category',
      brand: 'sample brand',
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: 'sample description',
    });
    const product = await newProduct.save();
    res.send({ message: 'Product Created', product });
  })
);
//UPDATING PRODUCT
productRouter.put(
  '/admin/updateProduct',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.body.id;
    const foundProduct = await Product.findById(productId);
    if (foundProduct) {
      foundProduct.name = req.body.name;
      foundProduct.slug = req.body.slug;
      foundProduct.price = req.body.price;
      foundProduct.category = req.body.category;
      foundProduct.countInStock = req.body.countInStock;
      foundProduct.description = req.body.description;
      foundProduct.image = req.body.image;
      foundProduct.brand = req.body.brand;
      await foundProduct.save();
      res.send({ message: 'Product Updated Successfully' });
    } else {
      res.status(404).send({ message: 'Something went wrong' });
    }
  })
);
//FILTERING PRODUCTS BASED ON THE USER SELECTION
productRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const category = query.category || '';
    const price = query.price || '';
    const rating = query.rating || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
            name: {
              $regex: searchQuery,
              $options: 'i',
            },
          }
        : {};
    const categoryFilter = category && category !== 'all' ? { category } : {};
    const ratingFilter =
      rating && rating !== 'all'
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    const priceFilter =
      price && price !== 'all'
        ? {
            // 1-50
            price: {
              $gte: Number(price.split('-')[0]),
              $lte: Number(price.split('-')[1]),
            },
          }
        : {};
    const sortOrder =
      order === 'featured'
        ? { featured: -1 }
        : order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : order === 'newest'
        ? { createdAt: -1 }
        : { _id: -1 };

    const products = await Product.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    }).sort(sortOrder);

    const countProducts = await Product.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    res.send({
      products,
      countProducts,
    });
  })
);

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
