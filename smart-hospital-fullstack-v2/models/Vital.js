import mongoose from "mongoose";
const schema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  type: { type: String, enum: ["bp","hr","spo2","temp","resp"], required: true },
  value: { type: Number, required: true }, unit: String, takenAt: { type: Date, default: Date.now }
},{timestamps:true});
export default mongoose.model("Vital", schema);
