import express from "express";
import { updateUser } from "../controllers/user.js";
const UserRouter = express.Router();

// ? updating user
UserRouter.put("/update-account/:id",updateUser)

export default UserRouter;