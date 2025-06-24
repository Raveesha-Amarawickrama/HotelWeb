import Gallery from "../models/Gallery.js";

export const uploadImage = async (req, res) => {
  try {
    const imageUrl = req.file?.path || req.body.imageUrl;

    const newImage = new Gallery({
      title: req.body.title || "",
      imageUrl,
    });

    await newImage.save();
    res.status(201).json(newImage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getGalleryImages = async (req, res) => {
  try {
    const images = await Gallery.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: "Image deleted" });
  } catch (err) {
    res.status(404).json({ message: "Image not found" });
  }
};
