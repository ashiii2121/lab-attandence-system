const mongoose = require('mongoose');

const connectDB = () => {
  return mongoose.connect('mongodb://127.0.0.1:27017/mongodb-3');
};

module.exports = connectDB;
