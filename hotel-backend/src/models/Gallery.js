import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  title: { type: String },
  imageUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Gallery", gallerySchema);
