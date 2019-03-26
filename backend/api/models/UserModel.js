const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const User = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  secret: {
    type: String,
    required: true
  }
});


User.pre("save", function (next) {
  if (!this.isModified("secret") && !this.isModified("password")) return next();

    bcrypt.hash(this.password, 12, (errp, hash) => {
      if (errp) {
        return next(errp);
      }
      this.password = hash;

      next();
    });
  bcrypt.hash(this.secret, 12, (errp, hash) => {
    if (errp) {
      return next(errp);
    }
    this.secret = hash;

    next();
  });

});

User.methods.checkPassword = function(plainTextPassword, callBack) {
  bcrypt.compare(plainTextPassword, this.password, (err, match) => {
    if (err) return callBack(err);
    callBack(null, match);
  });
};

User.methods.checkSecret = function(plainTextSecret, callBack) {
  bcrypt.compare(plainTextSecret, this.secret, (err, match) => {
    if (err) return callBack(err);
    callBack(null, match);
  });
};

module.exports = mongoose.model("user", User);
