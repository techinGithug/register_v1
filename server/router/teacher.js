require('dotenv').config()

const express = require('express')
const app = express()
const router = express.Router()
const jwt = require("jsonwebtoken")
const db = require('../config/connect-db')

app.use(express.json())

router.get('/', authenticateToken, (req, res) => {
    const name = req.user.name
    const sql  = "select * from register_v1.teachers where t_username = ? and t_delete = ?";
    const rs =  db.query(sql, [name, "0"], (err, row) => {
        if(!err) {
            res.json(row)
        } else {
            res.json(err)
        }
    })

});

router.get('/subjects', authenticateToken, (req, res) => {
    const { id } = req.query
    console.log(id)
    let sql  = "select * from register_v1.subjects where sj_teacher = ?";
    const rs = db.query(sql, [id], (err, row) => {
        if(!err) {
            res.send(row)
        } else {
            res.send(err)
        }
    })
});

router.get('/students', authenticateToken, (req, res) => {
    const { id } = req.query
    let sql  = " select ";
        sql += "    rg.id, ";
        sql += "    rg.std_id, ";
        sql += "    std.std_firstname, ";
        sql += "    std.std_lastname, ";
        sql += "    sj.sj_code, ";
        sql += "    sj.sj_name, ";
        sql += "    sj.sj_credit, ";
        sql += "    t.t_firstname, ";
        sql += "    t.t_lastname, ";
        sql += "    rg.score, ";
        sql += "    rg.grade ";
        sql += " from ";
        sql += "    register_v1.registers rg, ";
        sql += "    register_v1.students std, ";
        sql += "    register_v1.subjects sj, ";
        sql += "    register_v1.teachers t ";
        sql += " where rg.sj_id = sj.id ";
        sql += " and rg.t_id = t.id ";
        sql += " and rg.std_id = std.id ";
        sql += " and rg.t_id = ? ";
        sql += " order by rg.std_id ";

    const rs = db.query(sql, [id], (err, row) => {
        if(!err) {
            res.send(row)
        } else {
            res.send(err)
        }
    })
});

router.put('/score', authenticateToken, (req, res) => {
    const { id, score, grade, grade_ } = req.body
    let sql  = " update register_v1.registers set score = ?, grade = ?, grade_ = ? where id = ?";
    const rs = db.query(sql, [score, grade, grade_, id], (err, data) => {
        if(!err) {
            res.send({"message":"Add score successful"})
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