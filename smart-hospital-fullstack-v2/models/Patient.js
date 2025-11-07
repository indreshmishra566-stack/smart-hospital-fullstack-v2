import mongoose from "mongoose";
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  age: Number, gender: String, address: String, phone: String, medicalHistory: String
},{timestamps:true});
export default mongoose.model("Patient", schema);
