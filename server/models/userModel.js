import mongoose, { Schema } from "mongoose";

const lastMailSchema = new Schema(
  {
    verifyCode: { type: Number },
  },
  {
    timestamps: {
      createdAt: false,
      updatedAt: true,
    },
  }
);

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    bookMarks: { type: [String], default: [] },
    imgUrl: { type: String, default: "" },
    // _id: { type: String },
    googleId: { type: String },
    isVerified: { type: Boolean, default: false },
    lastMail: { type: lastMailSchema },
  },
  { timestamps: true }
);

export default mongoose.model("Users", userSchema);
