import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  maxGuests: { type: Number, required: true },
  amenities: [String],
  images: [String],
  isAvailable: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Room", roomSchema);
