import "./config";
import cron from "node-cron";
import axios from "axios";

const axiosME = axios.create({
  baseURL: process.env.MANGA_EDEN_URL,
  transformResponse: [
    data => {
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch (e) {
          /* Ignore */
        }
      }
      return data.manga.map(key => {
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
    }
  ]
});

const seed = async () => {
  try {
    const res = await axiosME.get();
    console.log(res.data[0]);
  } catch (e) {
    console.log(e);
  }
};

seed();

cron.schedule("* * * * * *", () => {
  console.log("running a task every 5 seconds");
});
