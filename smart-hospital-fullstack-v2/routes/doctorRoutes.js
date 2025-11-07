import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { allow } from "../middleware/roleMiddleware.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import Record from "../models/Record.js";
const router = express.Router();

router.get("/me", auth, allow("doctor"), async (req,res)=>{
  const d = await Doctor.findOne({ user: req.user.id }).populate("user");
  res.json(d);
});

router.get("/patients", auth, allow("doctor"), async (_req,res)=>{
  const ps = await Patient.find().populate("user");
  res.json(ps);
});

router.post("/records", auth, allow("doctor"), async (req,res)=>{
  const { patientId, diagnosis, prescription, notes } = req.body;
  const d = await Doctor.findOne({ user: req.user.id });
  const rec = await Record.create({ patient: patientId, doctor: d._id, diagnosis, prescription, notes });
  res.status(201).json(rec);
});

export default router;
