require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require("jsonwebtoken")
const db = require('./config/connect-db')

const student = require('./router/student')
const teacher = require('./router/teacher')
const admin = require('./router/admin')
const { use } = require('./router/student')

app.use(cors())
app.use(express.json())

// JWT //
app.post('/authLogin', checkUsername, (req, res) => {
    const { username } = req.body
    const user = { name: username }
    const accessToken = generateAccessToken(user) //jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken: accessToken})
});

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET) // , {expiresIn: '2m'}
};

function checkUsername(req, res, next) {
    const { username, type } = req.body
    if(type === "Student") {
        let sql = " select std_username from register_v1.students where std_username = ? and std_delete = ? ";
        const rs = db.query(sql, [username, "0"], (err, row) => {
            if(!err) {
                if(row.length > 0) {
                    next()
                } else {
                    res.send(null)
                }
                
            } else {
                res.send(err)
            }
        })

    } else if(type === "Teacher") {
        let sql = " select t_username from register_v1.teachers where t_username = ? and t_delete = ? ";
        const rs = db.query(sql, [username, "0"], (err, row) => {
            if(!err) {
                if(row.length > 0) {
                    next()
                } else {
                    res.send(null)
                }
                
            } else {
                res.send(err)
            }
        })
    
    } else if(type === "Admin") {
        let sql = " select am_username from register_v1.admins where am_username = ? ";
        const rs = db.query(sql, [username], (err, row) => {
            if(!err) {
                if(row.length > 0) {
                    next()
                } else {
                    res.send(null)
                }
                
            } else {
                res.send(err)
            }
        })
    }
    
};  

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