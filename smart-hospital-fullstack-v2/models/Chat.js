import mongoose from "mongoose";
const schema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false }
},{timestamps:true});
export default mongoose.model("Chat", schema);
