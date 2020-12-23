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

router.post('/', (req, res) => {
    const { username, password, firstname, lastname } = req.body
    let sql  = " insert into register_v1.students ";
        sql  += " (std_username, std_password, std_firstname, std_lastname, std_delete) ";
        sql  += " values ";
        sql  += " (?,?,?,?,?) ";
    const rs = db.query(sql, [username, password, firstname, lastname, "0"], (err, data) => {
        if(!err) {
            res.send({"message":"Sign up new student successful"})
        } else {
            res.send(err)
        }
    })
});

router.post('/register', authenticateToken, (req, res) => {
    const { stdId, sjId, tId } = req.body
    let sql  = " insert into register_v1.registers ";
        sql += " (std_id, sj_id, t_id, score, grade) ";
        sql += " values ";
        sql += " (?,?,?,?,?) ";
    const rs = db.query(sql, [stdId, sjId, tId, null, null], (err, data) => {
        if(!err) {
            res.send({"message":"Registration successful"})
        } else {
            res.send(err)
        }
    })
});

router.get('/register', authenticateToken, (req, res) => {
    const { id } = req.query
    let sql  = " select ";
        sql += "    rg.id, "
        sql += "    rg.std_id, ";
        sql += "    sj.sj_code, ";
        sql += "    sj.sj_name, ";    
        sql += "    sj.sj_credit, ";
        sql += "    t.t_firstname, ";
        sql += "    t.t_lastname ";
        sql += " from ";
        sql += "    register_v1.registers rg, ";
        sql += "    register_v1.subjects sj, ";
        sql += "    register_v1.teachers t ";
        sql += " where rg.sj_id = sj.id ";
        sql += " and rg.t_id = t.id ";
        sql += " and rg.std_id = ? ";

    const rs = db.query(sql, [id], (err, row) => {
        if(!err) {
            res.send(row)
        } else {
            res.send(err)
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