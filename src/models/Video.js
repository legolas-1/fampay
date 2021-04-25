const mongoose = require('mongoose');

/* Video - title, description, publishing datetime, thumbnails URL, channel name */
const VideoSchema = mongoose.Schema({
  title: String,
  description: String,
  publishTime: Date,
  thumbnails: String,
  channelTitle: String
})

module.exports = mongoose.model('Video', VideoSchema);
