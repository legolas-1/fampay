const express = require('express');
const schedule = require('node-schedule');
const fetch = require('node-fetch');

const Video = require('./models/Video');
const connection = require('./connection/connection');

require('dotenv/config');

/* Express instance */
const app = express();

/* Connection to DB */
connection();

app.use(express.json());


const videoRoute = require('./routes/videoRoute');

app.use('/videos', videoRoute);

/* To use it in interval of 1hr uncomment the below line */

// schedule.scheduleJob('get-youtube-data', '0 * * * *', async () => {
//   const youtubeAPIUrl = process.env.YOUTUBE_API_URL + new Date(new Date() - 3600000).toISOString();

/* To use 1 hr interval comment below first two lines */

schedule.scheduleJob('get-youtube-data', '*/10 * * * * *', async () => {
  const youtubeAPIUrl = process.env.YOUTUBE_API_URL + new Date().toISOString();
  const fetchedResp = await fetch(youtubeAPIUrl);
  const videoList = await fetchedResp.json();

  videoList.items.forEach((cur) => {
    const dataItem = cur.snippet;

    const newData = new Video({
      title: dataItem.title,
      description: dataItem.description,
      thumbnails: dataItem.thumbnails.default.url,
      publishTime: dataItem.publishedAt,
      channelTitle: dataItem.channelTitle
    });

    newData.save().then((resp) => {
      console.log('data pushed', resp);
    }).catch((error) => {
      console.log('error', error);
    })
  })
  console.log('data updated');
})

app.listen(3000);

