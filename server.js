/** @format */
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const PORT = process.env.PORT;

const app = express();
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