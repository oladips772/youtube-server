/** @format */
import User from "../models/user.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

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
export const SignIn = asyncHandler(async (req, res) => {});
