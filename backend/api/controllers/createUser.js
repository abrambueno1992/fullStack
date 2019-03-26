const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

const createUser = (req, res) => {
  const { username, password, secret } = req.body;
  const user = new User({ username, password, secret });
  user
    .save()
    .then(user => res.status(201).send(user))
    .catch(err => res.status(500).send(err));
};
module.exports = {
  createUser
};
