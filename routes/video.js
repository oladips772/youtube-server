/** @format */
import express from "express";
import {
  addVideo,
  addView,
  deleteVideo,
  getVideo,
  random,
  sub,
  trend,
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
VideoRouter.put("/view/:id",addView)

// ? random video
VideoRouter.get("/random",random);

// ? getting subscribed videos
VideoRouter.get("/sub",sub);

// ? getting trending videos
VideoRouter.get("/trend",trend);


export default VideoRouter;
