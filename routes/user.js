/** @format */
import express from "express";
import {
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  updateUser,
} from "../controllers/user.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const UserRouter = express.Router();

// ? updating user
UserRouter.put("/update-account/:id", verifyToken, updateUser);

// ? deleting user account
UserRouter.delete("/delete-account/:id", verifyToken, deleteUser);

// ? get user
UserRouter.delete("/get-user/:id", getUser);

// ? sub
UserRouter.put("/sub/:id", verifyToken, subscribe);

// ? sub
UserRouter.put("/unsub/:id", verifyToken, unsubscribe);
export default UserRouter;
