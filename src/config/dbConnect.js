const mongoose = require("mongoose");

const connection = () => {
  return mongoose.connect(
    "mongodb+srv://ashwini1234:ashwini1234@cluster0.seroub9.mongodb.net/tummoc"
  );
};

module.exports = { connection };
