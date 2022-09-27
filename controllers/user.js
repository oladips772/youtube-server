/** @format */
import User from "../models/user.js";
import asyncHandler from "express-async-handler";

// ? updating user account
export const updateUser = asyncHandler(async (req, res, next) => {
  if (req.params.id !== req.user.id)
    return res.status(400).json({ error: "you can't update this account" });
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    ).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ? deleting a user account
export const deleteUser = asyncHandler(async (req, res, next) => {
  if (req.params.id !== req.user.id)
    return res.status(400).json({ error: "you can't delete this account" });
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "account deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ? get user account
export const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// ? subscribing to a channel
export const subscribe = asyncHandler(async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
      res.status(200).json({message:"subscription successfull"})
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// ? unsubscribing to a channel
export const unsubscribe = asyncHandler(async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    await User.findById(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json({ message: "unsubscription successfull" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});
