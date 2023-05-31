const express = require("express");
const cors = require("cors");
const { connection } = require("./src/config/dbConnect");
const user_router = require("./src/routes/user");
const city_router = require("./src/routes/city");

const app = express();

app.use(cors());
app.use(express.json());

// routes middleware
app.use("/user", user_router);
app.use("/city", city_router);

app.get("/", (req, res) => {
  res.send("home route");
});

app.listen(8000, async () => {
  await connection();
  console.log(`listening on port 8000`);
});
