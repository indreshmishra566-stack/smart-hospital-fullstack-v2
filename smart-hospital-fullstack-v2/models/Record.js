import mongoose from "mongoose";
const schema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  diagnosis: String, prescription: String, notes: String,
  visitDate: { type: Date, default: Date.now }
},{timestamps:true});
export default mongoose.model("Record", schema);
