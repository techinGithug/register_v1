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
          sql += "      sj.sj_teacher, ";
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
    let sql = " select * from register_v1.teachers where t_delete = ?";
    const rs = db.query(sql, ["0"], (err, row) => {
        if(!err) {
            res.send(row)
        } else {
            res.send(err)
        }
    })
});

router.get('/students', authenticateToken, (req, res) => {
    let sql = " select * from register_v1.students where std_delete = ?";
    const rs = db.query(sql, ["0"], (err, row) => {
        if(!err) {
            res.send(row)
        } else {
            res.send(err)
        }
    })
});

router.get('/registration', authenticateToken, (req, res) => {
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
        sql += " order by rg.std_id ";

    const rs = db.query(sql, (err, row) => {
        if(!err) {
            res.send(row)
        } else {
            res.send(err)
        }
    })
});

router.get('/countAdmin', authenticateToken, (req, res) => {
    let sql  = "select count(id) as admin from register_v1.admins"
    const rs = db.query(sql, (err, row) => {
        if(!err) {
            res.send(row)
        } else {
            res.send(err)
        }
    })
});

router.get('/countTeacher', authenticateToken, (err, res) => {
    let sql  = "select count(id) as teacher from register_v1.teachers"
    const rs = db.query(sql, (err, row) => {
        if(!err) {
            res.send(row)
        } else {
            res.send(err)
        }
    })
});

router.get('/countStudent', authenticateToken, (err, res) => {
    let sql  = "select count(id) as student from register_v1.students"
    const rs = db.query(sql, (err, row) => {
        if(!err) {
            res.send(row)
        } else {
            res.send(err)
        }
    })
});

router.get('/countSubject', authenticateToken, (err, res) => {
    let sql  = "select count(id) as subject from register_v1.subjects"
    const rs = db.query(sql, (err, row) => {
        if(!err) {
            res.send(row)
        } else {
            res.send(err)
        }
    })
});

router.get('/countRegistration', authenticateToken, (err, res) => {
    let sql  = "select count(id) as registration from register_v1.registers"
    const rs = db.query(sql, (err, row) => {
        if(!err) {
            res.send(row)
        } else {
            res.send(err)
        }
    })
});

router.post('/subject', authenticateToken, (req, res) => {
    const { code, name, credit, teacher } = req.body
    let sql  = " insert into register_v1.subjects (sj_code, sj_name, sj_credit, sj_teacher) ";
        sql += " values ";
        sql += " (?,?,?,?) "; 

    const rs = db.query(sql, [code, name, credit, teacher], (err, data) => {
        if(!err) {
            res.send({"message":"Add new subject successful"})
        } else {
            res.send(err)
        }
    })

});

router.post('/teacher', authenticateToken, (req, res) => {
    const { username, password, firstname, lastname } = req.body
    let sql  = " insert into register_v1.teachers (t_username, t_password, t_firstname, t_lastname, t_delete) ";
        sql += " values ";
        sql += " (?,?,?,?,?) ";

    const rs = db.query(sql, [username, password, firstname, lastname, "0"], (err, data) => {
        if(!err) {
            res.send({"message":"Add new teacher successful"})
        } else {
            res.send(err)
        }
    })
});

router.post('/student', authenticateToken, (req, res) => {
    const { username, password, firstname, lastname } = req.body
    let sql  = " insert into register_v1.students (std_username, std_password, std_firstname, std_lastname, std_delete) ";
        sql += " values ";
        sql += " (?,?,?,?,?) ";

    const rs = db.query(sql, [username, password, firstname, lastname, "0"], (err, data) => {
        if(!err) {
            res.send({"message":"Add new student successful"})
        } else {
            res.send(err)
        }
    })
});

// Soft delete teacher
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
});

// Soft delete student
router.put('/student', authenticateToken, (req, res) => {
    const { id } = req.body
    let sql  = " update register_v1.students set std_delete = ? where id = ?";
    const rs = db.query(sql, ["1", id], (err, data) => {
        if(!err) {
            res.send({"message":"Soft delete this student successful"})
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