const { authenticate } = require("../utils/middleware");

const { createUser } = require("../controllers");

module.exports = server => {
  server.route("/api/user/new").post(createUser);
  server.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "../../", "index.js"), function(err) {
      if (err) {
        res.status(500).send(err);
      }
    });
  });
};
