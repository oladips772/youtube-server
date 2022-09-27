/** @format */
import express from "express";
import {
  addVideo,
  deleteVideo,
  getVideo,
  updateVideo,
} from "../controllers/video.js";
const VideoRouter = express.Router();
import { verifyToken } from "../middlewares/verifyToken.js";

// ? add video
VideoRouter.post("/add", verifyToken, addVideo);

// ? update video
VideoRouter.put("/:id", verifyToken, updateVideo);

// ? delete video
VideoRouter.delete("/:id", verifyToken, deleteVideo);

// ? delete video
VideoRouter.get("/:id", getVideo);

// ? increasing video view
VideoRouter.put("/view/:id")

// ? random video
VideoRouter.get("/sub");

// ? getting subscribed videos
VideoRouter.get("/sub");


export default VideoRouter;
