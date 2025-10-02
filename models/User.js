import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true, // store emails in lowercase
      match: [/.+@.+\..+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // don't return password by default
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    cartItems: { type: Object, default: {} },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
    minimize: false,  // keeps empty objects in Mongo
  }
);

// ✅ Prevent model overwrite during hot reloads
const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
