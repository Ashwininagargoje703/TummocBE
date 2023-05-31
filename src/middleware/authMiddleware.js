const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../common/createToken");

const authMiddleware = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (jwt.verify(token, SECRET_KEY)) {
      let user = jwt.decode(token, SECRET_KEY);

      req.user = user;
      next();
    } else {
      return res.status(401).json({ msg: "not authenticated", status: 401 });
    }
  } catch (e) {
    return res
      .status(401)
      .json({ msg: "something went wrong", err: e.message });
  }
};

module.exports = { authMiddleware };
