const jwt = require("jsonwebtoken")
const {mysecret} = require("../../config")

const User = require("../models/UserModel")

const recover = (req, res) => {
    const {username, secret} = req.body;
    let id;
    User.findOne({username, secret}, (err, user) => {
        if (err) {
            res.status(403).json({error: "Invalid username/secret, credentials"});
            return;
        }
        if (user === null) {
            res.status(422).json({error: "No user with that username in user DB"});
            return;
        }
        user.checkSecret(secret, (noMatch,hashMatches) => {
            if (hashMatches === false) {
                res.status(422).json({error: "secret doesn't match"});
                return;
            }
            if (hashMatches) {
                const payload = {
                    username: user.username
                }
                id = user.id;
                // decrease the time of the token, it's a recovery token
                const token = jwt.sign(payload, mysecret, {expiresIn: 60 * 60});
                res.json({token, id, username})

            }
        })
    })
}

module.exports = {
    recover
}