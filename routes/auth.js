/** @format */
import express from "express";
import { SignIn, SignUp } from "../controllers/auth.js";
const AuthRouter = express.Router();

// ? sign up or register a user
AuthRouter.post("/signup", SignUp);

// ? sign in a user
AuthRouter.post("/signin", SignIn);


export default AuthRouter;
