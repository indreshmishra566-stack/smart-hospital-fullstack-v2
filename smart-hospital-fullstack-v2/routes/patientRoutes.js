import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { allow } from "../middleware/roleMiddleware.js";
import Patient from "../models/Patient.js";
import Record from "../models/Record.js";
import Vital from "../models/Vital.js";
const router = express.Router();

router.get("/me", auth, allow("patient"), async (req,res)=>{
  const p = await Patient.findOne({ user: req.user.id }).populate("user");
  res.json(p);
});

router.get("/records", auth, allow("patient"), async (req,res)=>{
  const p = await Patient.findOne({ user: req.user.id });
  const recs = await Record.find({ patient: p._id }).sort({createdAt:-1});
  res.json(recs);
});

router.post("/vitals", auth, allow("patient"), async (req,res)=>{
  const p = await Patient.findOne({ user: req.user.id });
  const { type, value, unit } = req.body;
  const v = await Vital.create({ patient: p._id, type, value, unit });
  res.status(201).json(v);
});

export default router;
