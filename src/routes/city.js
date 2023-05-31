const express = require("express");
const {
  createCities,
  getCities,
  getCitiesByUser,
} = require("../controller/city");
const { authMiddleware } = require("../middleware/authMiddleware");

const app = express.Router();

app.get("/get-cities", getCities);
app.post("/create-city", authMiddleware, createCities);
app.get("/get-cities-by-user", authMiddleware, getCitiesByUser);

module.exports = app;
