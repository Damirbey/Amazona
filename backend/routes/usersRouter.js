import Users from '../models/usersModel.js';
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { generateToken } from '../utils.js';
import bcrypt from 'bcryptjs';
const usersRouter = express.Router();

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

export default usersRouter;
