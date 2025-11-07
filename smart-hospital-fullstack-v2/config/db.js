import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI not set");
    await mongoose.connect(uri, { dbName: "smart_hospital" });
    console.log("✅ MongoDB Connected");
  } catch (e) {
    console.error("❌ Mongo Error:", e.message);
    process.exit(1);
  }
};
export default connectDB;
