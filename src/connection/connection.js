const mongoose = require('mongoose');
require('dotenv/config');

const connection = async () => {
  return await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to DB');
  });
}

module.exports = connection;