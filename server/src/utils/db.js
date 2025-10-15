import mongoose from "mongoose";    
import dotenv from "dotenv";

dotenv.config();
const connectDB = async () => {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/playnow";
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB connected");
};
export default connectDB;