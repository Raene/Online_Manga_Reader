import mongoose from "mongoose";

export const mangaSchema = new mongoose.Schema({
  alias: String,
  categories: [String],
  hits: Number,
  image: String,
  last_chapter_date: Number,
  status: Number,
  title: String
});

const MangaModel = mongoose.model("manga", mangaSchema);

export default MangaModel;
