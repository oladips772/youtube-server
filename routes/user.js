/** @format */
import express from "express";
import { deleteUser, updateUser } from "../controllers/user.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const UserRouter = express.Router();

// ? updating user
UserRouter.put("/update-account/:id", verifyToken, updateUser);

UserRouter.delete("/delete-account/:id", verifyToken, deleteUser);


export default UserRouter;
