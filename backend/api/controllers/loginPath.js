const jwt = require("jsonwebtoken")
const {mysecret} = require("../../config")

const User = require("../models/UserModel")

const login = (req, res) => {
    const {username, password} = req.body;
    let id;
    User.findOne({username, passowrd}, (err, user) => {
        if (err) {
            res.status(403).json({error: "Invalid username/password, credentials"});
            return;
        }
        if (user === null) {
            res.status(422).json({error: "No user with that username in user DB"});
            return;
        }
        user.checkPassword(password, (noMatch,hashMatches) => {
            if (hashMatches === false) {
                res.status(422).json({error: "passwords don't match"});
                return;
            }
            if (hashMatches) {
                const payload = {
                    username: user.username
                }
                id = user.id;
                const token = jwt.sign(payload, mysecret, {expiresIn: 60 * 60});
                res.json({token, id, username})

            }
        })
    })
}

module.exports = {
    login
}