import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";
const router = express.Router();

router.post("/register", async (req,res)=>{
  try{
    const { name, email, password, role, profile={} } = req.body;
    if(await User.findOne({email})) return res.status(400).json({message:"User exists"});
    const hashed = await bcrypt.hash(password,10);
    const user = await User.create({ name, email, password: hashed, role });
    if(role==="patient") await Patient.create({ user: user._id, ...profile });
    if(role==="doctor") await Doctor.create({ user: user._id, ...profile });
    res.status(201).json({ id: user._id, role: user.role });
  }catch(e){ res.status(500).json({message:e.message}); }
});

router.post("/login", async (req,res)=>{
  try{
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message:"User not found"});
    const ok = await bcrypt.compare(password, user.password);
    if(!ok) return res.status(400).json({message:"Invalid credentials"});
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, role: user.role, id: user._id });
  }catch(e){ res.status(500).json({message:e.message}); }
});

export default router;
