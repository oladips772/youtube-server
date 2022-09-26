/** @format */
import User from "../models/user.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ? signup a user function
export const SignUp = asyncHandler(async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const user = new User({ ...req.body, password: hash });
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

// ? sign in a user function
export const SignIn = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ error: "no user found" });
  }
  const isCorrect = await bcrypt.compare(req.body.password, user.password);

  if (!isCorrect) {
    return res.status(400).json({ error: "wrong email or password" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  // ? destructuring password and other data from user
  const { password, ...others } = user._doc;

  res.cookie("access_token", token, {
    httpOnly: true,
  });
  res.status(200).json(others);
});
