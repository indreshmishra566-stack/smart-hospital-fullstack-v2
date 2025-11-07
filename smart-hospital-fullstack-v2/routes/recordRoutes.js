import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import Record from "../models/Record.js";
const router = express.Router();
router.get("/:patientId", auth, async (req,res)=>{
  const { patientId } = req.params;
  const recs = await Record.find({ patient: patientId }).sort({createdAt:-1});
  res.json(recs);
});
export default router;
