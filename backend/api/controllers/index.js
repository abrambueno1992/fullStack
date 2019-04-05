const { createUser } = require("./createUser");
const {login} = require("./loginPath")
const {updateUser} = require("./updateUser")
const {recover} = require("./recoverUser")
const {createNotes} = require("./createNote")
const {getNoteByCreatorId} = require("./getNotesByCreatorId")

module.exports = {
  createUser,
  login,
  updateUser,
  recover,
  createNotes,
  getNoteByCreatorId
};
