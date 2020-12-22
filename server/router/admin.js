require('dotenv').config()

const express = require('express')
const app = express()
const router = express.Router()
const jwt = require("jsonwebtoken")
const db = require('../config/connect-db')

app.use(express.json())

router.get('/', authenticateToken, (req, res) => {
    const  name  = req.user.name
    const sql  = "select * from register_v1.admins where am_username = ?";
    const rs =  db.query(sql, [name], (err, row) => {
        if(!err) {
            res.json(row)
        } else {
            res.json(err)
        }
    })

});

router.get('/subjects', authenticateToken, (req, res) => {
    let sql  = " select ";
          sql += "      sj.id, ";
          sql += "      sj.sj_code, ";
          sql += "      sj.sj_name, ";
          sql += "      sj.sj_credit, ";
          sql += "      (select t_firstname ";
          sql += "          from register_v1.teachers ";
          sql += "          where id = sj.sj_teacher ";
          sql += "      ) as t_firstname, ";
          sql += "      (select t_lastname ";
          sql += "          from register_v1.teachers ";
          sql += "          where id = sj.sj_teacher ";
          sql += "      ) as t_lastname ";
          sql += " from  ";
          sql += "      register_v1.subjects sj ";
    const rs = db.query(sql, (err, row) => {
        if(!err) {
            res.send(row)
        } else {
            res.send(err)
        }
    })
});

router.get('/teachers', authenticateToken, (req, res) => {
    const condition = "0";
    let sql = " select * from register_v1.teachers where t_delete = ?";
    const rs = db.query(sql, [condition], (err, row) => {
        if(!err) {
            res.send(row)
        } else {
            res.send(err)
        }
    })
});

router.post('/teacher', authenticateToken, (req, res) => {
    const { username, password, firstname, lastname } = req.body
    let sql  = " insert into register_v1.teachers (t_username, t_password, t_firstname, t_lastname) ";
        sql += " values ";
        sql += " (?,?,?,?) ";

    const rs = db.query(sql, [username, password, firstname, lastname], (err, data) => {
        if(!err) {
            res.send({"message":"Add new teacher successful"})
        } else {
            res.send(err)
        }
    })
});

router.put('/teacher', authenticateToken, (req, res) => {
    const { id } = req.body
    let sql  = " update register_v1.teachers set t_delete = ? where id = ?";
    const rs = db.query(sql, ["1", id], (err, data) => {
        if(!err) {
            res.send({"message":"Soft delete this teacher successful"})
        } else {
            res.send(err)
        }
    })
})

router.get('/students', authenticateToken, (req, res) => {
    let sql = " select * from register_v1.students ";
    const rs = db.query(sql, (err, row) => {
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