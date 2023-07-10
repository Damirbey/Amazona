import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
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
app.use(
  cors({
    allowedHeaders: ['sessionId', 'Content-Type','*'],
    exposedHeaders: ['sessionId'],
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  })
);

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
//SERVING APP ON THE SERVER
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
});

//ERROR HANDLING API
app.use((err, req, res, next) => {
  next();
  res.status(500).send({ message: err.message });
});

//RUNNING THE SERVER
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
