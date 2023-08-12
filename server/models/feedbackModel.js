import mongoose, { Schema } from "mongoose";

const feedbackSchema = new Schema(
  {
    creatorId: { type: String },
    feedback: { type: String },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

export default mongoose.model("Feedback", feedbackSchema);
