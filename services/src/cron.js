import "./config";
import cron from "node-cron";
import "./db/connection";
import MangaModel from "./db/model/Manga";
import axios from "axios";

const axiosME = axios.create({
  baseURL: process.env.MANGA_EDEN_URL
});

//theis function 
//filters mangas without last updated date
//then maps and returns a new object
//with more readable keys
const transformMangaEden = manga =>
  manga
    .filter(key => key.ld)
    .map(key => {
      return {
        _id: key.i,
        alias: key.a,
        categories: key.c,
        hits: key.h,
        images: key.im,
        status: key.s,
        last_chapter_date: key.ld,
        title: key.t
      };
    });

const seed = async () => {
  try {
    const res = await axiosME.get();
    const mangas = transformMangaEden(res.data.manga);
    console.log("performing db now");
    await MangaModel.insertMany(mangas);
  } catch (e) {
    console.log(e);
  }
};

seed();

// cron.schedule("* * * * * *", () => {
//   console.log("running a task every 5 seconds");
// });
