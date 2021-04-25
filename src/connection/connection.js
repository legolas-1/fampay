const mongoose = require('mongoose');
require('dotenv/config');

const connection = async () => {

  const dbUrl = `mongodb+srv://fampay-user:${process.env.DB_PASSWORD}@cluster0.x4pss.mongodb.net/fampay?retryWrites=true&w=majority`
  return await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to DB');
  });
}

module.exports = connection;