import mongoose from "mongoose";
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  specialization: String, licenseNo: String
},{timestamps:true});
export default mongoose.model("Doctor", schema);
