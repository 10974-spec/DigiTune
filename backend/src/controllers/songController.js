import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";

const addSong = async (req, res) => {
  try {
    const name = req.body.name;
    const desc = req.body.desc;
    const album = req.body.album;
    const bgColor = req.body.bgColor;
    const imageFile = req.files.image[0];
    const audioFile = req.files.audio[0];

    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video",
    });

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "Image",
    });
    const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(
      audioUpload.duration % 60
    )}`;

    const songData = {
      name,
      desc,
      album,
      image: imageUpload.secure_url,
      file: audioUpload.secure_url,
      duration,
    };

    const song = songModel(songData);
    await song.save();
    res.json({ success: true, message: "song uploaded successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const listSong = async (req, res) => {
    try {
        const allSongs = await songModel.find({})
        res.json({success: true, message: "songs fetched successfully", songs: allSongs})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
};

const removeSong = async (req, res) => {
    try {
        await songModel.findByIdAndDelete(req.body.id)
        res.json({success: true, message: "song deleted successfully"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export { addSong, listSong ,removeSong};
