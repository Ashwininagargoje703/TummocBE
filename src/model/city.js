const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema({
  name: { type: String },
  user_live_in: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

const CityModel = mongoose.model("city", CitySchema);

module.exports = CityModel;
