const { createUser } = require("./createUser");
const {login} = require("./loginPath")
const {updateUser} = require("./updateUser")
const {recover} = require("./recoverUser")
module.exports = {
  createUser,
  login,
  updateUser,
  recover
};
