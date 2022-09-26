/** @format */
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserRouter from "./routes/user.js";
import AuthRouter from "./routes/auth.js";
import CommentRouter from "./routes/comment.js";
import VideoRouter from "./routes/video.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use("/api/users", UserRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/comments", CommentRouter);
app.use("/api/videos", VideoRouter);

app.get("/", (req, res) => res.send("hello api.."));

// ? connecting to mongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`server running on port ${PORT} --- mongoDB connected`)
    );
  })
  .catch((err) => console.log(err));
