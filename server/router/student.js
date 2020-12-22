require('dotenv').config()

const express = require('express')
const app = express()
const router = express.Router()
const jwt = require("jsonwebtoken")
const db = require('../config/connect-db')

app.use(express.json())

// const students = [
//     {
//         "id":"1",
//         "username":"techin",
//         "firstname":"Techin",
//         "lastname":"Nakata"
//     },
//     {
//         "id":"2",
//         "username":"jimmy",
//         "firstname":"Jimmy",
//         "lastname":"Doe"
//     }
// ];

router.get('/', authenticateToken, (req, res) => {
    // res.json(students.filter(student => student.username === req.user.name))
    const  name  = req.user.name
    const sql  = "select * from register_v1.students where std_username = ?";
    const rs =  db.query(sql, [name], (err, row) => {
        if(!err) {
            res.json(row)
        } else {
            res.json(err)
        }
    })

});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
};

module.exports = router;