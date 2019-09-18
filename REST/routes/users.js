var express = require('express');
var router = express.Router();
const pool = require('../db/db.js');

router.get('/:cedula', (req, response) => {
    pool.query('SELECT * FROM users WHERE cedula = ?', [req.params.cedula],
    (error, result) => {
        if (error) throw error;
        response.send(result);
    });
});

router.post('/', (req, res) => {
    pool.query(`REPLACE INTO users (
                    FIRST_NAME,
                    SECOND_NAME,
                    FIRST_SURNAME ,
                    SECOND_SURNAME ,
                    CEDULA ,
                    EMAIL ,
                    GENDER ,
                    DOB ,
                    CELLPHONE
                )
                VALUES (
                    ?,?,?,?,?,?,?,?,?
                );`,
        [
            req.body.first_name,
            req.body.second_name,
            req.body.first_surname,
            req.body.second_surname,
            req.body.cedula,
            req.body.email,
            req.body.gender,
            req.body.dob,
            req.body.cellphone
        ],
        (error, result) => {
            if (error) throw error;

            res.send('User added succesfully.');
        });

});

module.exports = router;
