import "./config";
import "./server";
import "./db/connection";

import MangaModel from "./db/model/Manga";

const manga = {
  alias: "birdcage-classroom",
  category: ["School Life", "Shoujo"],
  hits: 780,
  image: "8b/8bbd8e661a3d83543dbe364cf5228fe12d8788ed0a850cf8b3f05263.png",
  last_chapter_date: 1537857456.0,
  status: 2,
  title: "Birdcage Classroom"
};
MangaModel.create(manga, (err, manga) => {
  if (err) return console.log(err);
  console.log("saved", manga);
});
