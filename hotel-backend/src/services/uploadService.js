import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "hotel-gallery",
    });

    // Delete local file after upload
    fs.unlinkSync(filePath);

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Image upload failed");
  }
};
