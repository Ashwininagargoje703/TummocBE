const CityModel = require("../model/city");
const UserModel = require("../model/user");

async function createCities(req, res) {
  try {
    let user = req.user;
    let { city } = req.body;

    let isExists = await CityModel.findOne({
      name: city,
      user_live_in: user._id,
    });
    if (isExists) {
      return res.status(409).json({ msg: "already exists", status: 409 });
    }

    let newCity = await CityModel.create({
      name: city,
      user_live_in: user._id,
    });
    res.json({ msg: "created", city: newCity });
  } catch (e) {
    res.status(500).json({ msg: "something went wrong", err: e.message });
  }
}

async function getCities(req, res) {
  try {
    const city = await CityModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_live_in",
          foreignField: "_id",
          as: "user_details",
        },
      },
      {
        $unwind: "$user_details",
      },
    ]);
    res.json({ city });
  } catch (e) {
    res.status(500).json({ msg: "something went wrong", err: e.message });
  }
}

async function getCitiesByUser(req, res) {
  try {
    let user = req.user;
    let city = await UserModel.aggregate([
      {
        $match: {
          username: user.username,
        },
      },
      {
        $lookup: {
          from: "cities",
          localField: "_id",
          foreignField: "user_live_in",
          as: "city_details",
        },
      },
      {
        $unwind: "$city_details",
      },
    ]);

    res.json({ city });
  } catch (e) {
    res.status(500).json({ msg: "something went wrong", err: e.message });
  }
}

module.exports = { createCities, getCities, getCitiesByUser };
