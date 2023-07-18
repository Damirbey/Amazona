import Users from '../models/usersModel.js';
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { generateToken, isAuth, isAdmin } from '../utils.js';
import bcrypt from 'bcryptjs';
const usersRouter = express.Router();

//DISPLAYING ALL USERS FOR THE ADMIN
usersRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await Users.find();
    res.send(users);
  })
);
//SIGNING IN USER
usersRouter.post(
  '/signIn',
  expressAsyncHandler(async (req, res) => {
    const user = await Users.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
      res.status(401).send({ message: 'Invalid email or password' });
    } else {
      res.status(401).send({ message: 'Invalid email or password' });
    }
  })
);
//SIGNING UP NEW USER
usersRouter.post(
  '/signUp',
  expressAsyncHandler(async (req, res) => {
    const newUser = new Users({
      email: req.body.email,
      name: req.body.name,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);
//UPDATING USER PROFILE
usersRouter.put(
  '/userProfile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await Users.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);

//DELETING SELECTED USER BY THE ADMIN
usersRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const userToDelete = await Users.findById(req.params.id);
    if (userToDelete) {
      if (userToDelete.email != 'admin@example.com') {
        await userToDelete.deleteOne();
        res.send({ message: 'User Deleted Successfully!' });
      } else {
        res.status(404).send({ message: 'You can not delete admin user!' });
      }
    } else {
      res.status(404).send({ message: 'User not found!' });
    }
  })
);

export default usersRouter;
