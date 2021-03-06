const { authenticate} = require("../utils/middleware");

const { createUser, login, updateUser, recover, createNotes, getNoteByCreatorId} = require("../controllers");

module.exports = server => {
  server.route("/api/user/new").post(createUser);
  server.route('/api/user/login').post(login);
  server.route("/api/user/recover").post(recover);
  server.route("/api/notes/create").post(authenticate,createNotes);
  server.route("/api/notes/getnotes").post(authenticate, getNoteByCreatorId);
  server.route("/api/user/userupdate").put(authenticate, updateUser)

  server.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "../../", "index.js"), function(err) {
      if (err) {
        res.status(500).send(err);
      }
    });
  });
};
