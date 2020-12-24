require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require("jsonwebtoken")

const student = require('./router/student')
const teacher = require('./router/teacher')
const admin = require('./router/admin')

app.use(cors())
app.use(express.json())

// JWT //
app.post('/authLogin', (req, res) => {
    const username = req.body.username
    const user = { name: username }
    const accessToken = generateAccessToken(user) //jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken: accessToken})
});

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET) // , {expiresIn: '2m'}
}

// ROUTER //
app.use('/admin', admin)
app.use('/student', student)
app.use('/teacher', teacher)


app.listen(3001, (err) => {
    if(err) {
        console.error(err)
    } else {
        console.log('Server listening on port 3001')
    }
});