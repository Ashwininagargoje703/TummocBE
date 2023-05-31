const { createToken } = require("../common/createToken");
const UserModel = require("../model/user");

async function registerUser(req, res) {
  try {
    let { username, password, name } = req.body;
    let user = await UserModel.findOne({ username });
    if (user) {
      return res.status(409).json({ msg: "already registered", status: 409 });
    }
    let nUser = await UserModel.create({ username, password, name });
    let token = createToken(nUser);
    res.json({
      token,
      msg: "registered successfully",
      user: nUser,
      status: 201,
    });
  } catch (e) {
    res.status(500).json({ msg: "something went wrong", err: e.message });
  }
}

async function loginUser(req, res) {
  try {
    let { username, password } = req.body;

    let user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ msg: "user not found!", status: 404 });
    }

    if (user.password !== password) {
      return res.status(401).json({ msg: "incorrect password!", status: 401 });
    }
    let token = createToken(user);
    res.json({ msg: "login successfull", token, user });
  } catch (e) {
    res.status(500).json({ msg: "something went wrong", err: e.message });
  }
}

module.exports = { registerUser, loginUser };
