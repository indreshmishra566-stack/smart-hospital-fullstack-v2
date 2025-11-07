import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import Chat from "../models/Chat.js";
const router = express.Router();
router.post("/", auth, async (req,res)=>{
  const { to, message } = req.body;
  const chat = await Chat.create({ from: req.user.id, to, message });
  res.status(201).json(chat);
});
router.get("/thread/:userId", auth, async (req,res)=>{
  const { userId } = req.params;
  const thread = await Chat.find({ $or:[{from:req.user.id,to:userId},{from:userId,to:req.user.id}] }).sort({createdAt:1});
  res.json(thread);
});
export default router;
