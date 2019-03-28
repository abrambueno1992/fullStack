const { createUser } = require("./createUser");
const {login} = require("./loginPath")
const {updateUser} = require("./updateUser")
const {recover} = require("./recoverUser")
const {createNotes} = require("./createNote")
module.exports = {
  createUser,
  login,
  updateUser,
  recover,
  createNotes
};
