const User = require("../models/UserModel")
const bcrypt = require("bcrypt")

const updateUser = (req, res) => {
    if (req.decoded) {
        let {id, username, password, secret} = req.body;
        const options = {
            new: true
        }
        const newInfo = new User({username, password, secret});
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) {
                return next(err);
            }
            password = hash;
            next();
        });
        bcrypt.hash(user.secret, salt, null, function(err, hash) {
            if (err) {
                return next(err);
            }
            secret = hash;
            next();
        });
        const update = {
            username: username,
            password: password,
            secret: secret
        }
        User.findByIdAndUpdate(id, update, options)
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    } else {
        return res.status(422).json({error: "Unable to update user information"})
    }
}

module.exports = {
    updateUser
}