const { authenticate} = require("../utils/middleware");

const { createUser, login, updateUser, recover, createNotes} = require("../controllers");

module.exports = server => {
  server.route("/api/user/new").post(createUser);
  server.route('/api/user/login').post(login);
  server.route("/api/user/recover").post(recover);
  server.route("/api/notes/create").post(createNotes)
  server.route("/api/user/userupdate").put(authenticate, updateUser)

  server.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "../../", "index.js"), function(err) {
      if (err) {
        res.status(500).send(err);
      }
    });
  });
};
