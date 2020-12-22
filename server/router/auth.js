require('dotenv').config()

const express = require('express')
const app = express()
const router = express.Router()
const jwt = require("jsonwebtoken")

app.use(express.json())

router.post('/login', (req, res) => {
    // Authenticate user
    const username = req.body.username
    const user = { name: username }
    const accessToken = generateAccessToken(user)
    res.json({accessToken: accessToken})
});

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET) //{expiresIn: '15s'}
}

module.exports = router;