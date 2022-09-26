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
    return res.status(400).json({ error: "you can't update this account" });
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "account deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
