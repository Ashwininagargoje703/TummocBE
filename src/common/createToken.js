const jwt = require("jsonwebtoken");
const SECRET_KEY = "SOME_VERY_SECURE_SECRET_KEY_WHICH_SHOULD_NOT_BE_HERE";

const createToken = (payload) => {
  payload = JSON.stringify(payload);
  let token = jwt.sign(payload, SECRET_KEY);

  return token;
};

module.exports = { createToken, SECRET_KEY };
