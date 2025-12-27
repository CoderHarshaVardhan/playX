import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },

  gender: { type: String, enum: ["", "male", "female", "other"], default: "" },

  age: { type: Number },
  preferredSports: { type: [String], default: [] },
  skillLevel: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner",
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
    address: { type: String, default: "" },
  },
  bio: { type: String, default: "" },
  profileCompleted: { type: Boolean, default: false },


  createdAt: { type: Date, default: Date.now },
});

UserSchema.index({ location: "2dsphere" });

export default mongoose.model("User", UserSchema);
