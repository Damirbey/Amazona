import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRouter.js';
import productRouter from './routes/productRouter.js';
import usersRouter from './routes/usersRouter.js';
import orderRouter from './routes/orderRouter.js';
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//INSERTING ALL PRODUCTS
app.use('/api/seed', seedRouter);
//RETRIEVING PRODUCTS
app.use('/api/products', productRouter);
//SIGN IN API
app.use('/api/users', usersRouter);
//PLACING AN ORDER
app.use('/api/orders', orderRouter);

//RETURNING PAYPAL CLIENT ID
app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
//ERROR HANDLING API
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

//RUNNING THE SERVER
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
