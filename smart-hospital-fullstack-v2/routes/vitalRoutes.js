import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import Vital from "../models/Vital.js";
const router = express.Router();
router.get("/:patientId", auth, async (req,res)=>{
  const { patientId } = req.params;
  const list = await Vital.find({ patient: patientId }).sort({createdAt:-1});
  res.json(list);
});
export default router;
