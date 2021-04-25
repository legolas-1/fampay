const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
require('dotenv/config');

router.get('/', async (req, res) => {
  if (req.query.search) {
    let regex = req.query.search;
    await Video.find({
      title: { $regex: regex, $options: 'i' },
      description: { $regex: regex, $options: 'i' }
    }, (error, list) => {
      res.send(list);
    });
  } else {
    try {
      let { page } = req.query;
      if (!page)
        page = 1;

      const limit = parseInt(process.env.RESULT_SIZE, 10);
      const skip = (page - 1) * process.env.RESULT_SIZE;

      const videos = await Video.find().sort('-publishTime').limit(limit).skip(skip);

      if (videos.length === 0) {
        res.sendStatus(404);
      } else {
        res.send(videos);
      }

    } catch (error) {
      res.sendStatus(500);
    }

  }
});

module.exports = router;