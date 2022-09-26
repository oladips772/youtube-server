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
app.use(express.json());

// ? routes
app.use("/api/users", UserRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/comments", CommentRouter);
app.use("/api/videos", VideoRouter);


// ? middle wares for handling error
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

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
