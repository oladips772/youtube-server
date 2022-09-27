/** @format */
import Video from "../models/video.js";
import asyncHandler from "express-async-handler";

// ? add video
export const addVideo = asyncHandler(async (req, res) => {
  try {
    const video = new Video({ userId: req.user.id, ...req.body });
    await video.save();
    res.status(200).json(video);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ? update video
export const updateVideo = asyncHandler(async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(400).json({ error: "cant find video" });
    if (req.user.id !== video.userId)
      return res.status(400).json({ error: "you cant update this video" });
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedVideo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ? delete video
export const deleteVideo = asyncHandler(async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(400).json({ error: "cant find video" });
    if (req.user.id !== video.userId)
      return res.status(400).json({ error: "you can't delete this video" });
    await Video.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "video deleted successfull" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ? get video
export const getVideo = asyncHandler(async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(400).json({ error: "no video found" });
    res.status(200).json(video);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ? get video
export const addView = asyncHandler(async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(400).json({ error: "no video found" });
    res.status(200).json(video);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
