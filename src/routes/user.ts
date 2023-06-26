import express from 'express';

const userRouter = express.Router();
import UserSchema from "../models/User";

const userPath = '/user';

userRouter.get(userPath, async (req, res) => {
  try {
    const users = await UserSchema.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

userRouter.post(userPath, async (req, res) => {
  const newUser = new UserSchema({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    newUser.save();
    res.status(200).json(newUser)
  } catch (err) {
    res.status(500).json(err);
  }
});

export default userRouter;
