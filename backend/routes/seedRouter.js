import express from 'express';
import Product from '../models/productModel.js';
import Users from '../models/usersModel.js';
import data from '../data.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Product.deleteMany({});
  const createdProducts = await Product.insertMany(data.products);
  await Users.deleteMany({});
  const createdUsers = await Users.insertMany(data.users);
  res.send({ createdProducts, createdUsers });
});

export default seedRouter;
