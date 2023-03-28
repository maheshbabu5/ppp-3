const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const SECRET_CODE = "123456789"
const { offer } = require("../schemas/offer-schema");
const getUserByToken = (token) => {
    return new Promise((resovle, reject) => {
        if (token) {
            let userData
            try {
                userData = jwt.verify(token, SECRET_CODE)
                resovle(userData)
            } catch (err) {
                reject("Invalid Token!")
            }
        } else {
            reject("Token not found")
        }
    })
}
router.get("/", async (req, res) => {
})
router.post("/create", async (req, res) => {
    // find the user
    getUserByToken(req.headers.authorization).then((user) => {
        // create a offer based on user
        offer.create({ ...req.body, username: user.username }).then((offer) => {
            res.status(200).send(offer)
        }).catch((err) => {
            res.status(400).send(err)
        })
        // res.status(200).send(user)
    }).catch((err) => {
        res.status(400).send({ message: err.message })
    })
})
module.exports = router;
