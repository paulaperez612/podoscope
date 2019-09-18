var express = require('express');
var router = express.Router();
const pool = require('../db/db.js');

router.get('/:cedula', (req, response) => {
    pool.query('SELECT * FROM podoscope WHERE USER_ID = ?', [req.params.cedula],
        (error, result) => {
            if (error) throw error;
            response.send(result);
        });
});

router.post('/', (req, res) => {
    pool.query(`REPLACE INTO podoscope (
                                    USER_ID,
                                    IMG_ID,
                                    IMAGE ,
                                    LINE_L ,
                                    X_L ,
                                    Y_L ,
                                    LINE_R ,
                                    X_R ,
                                    Y_R,
                                    LAST_MOD
                                )
                VALUES (?,?,?,?,?,?,?,?,?,NOW()
                    )`,
        [
            req.body.user_id,
            req.body.img_id,
            req.body.image,
            req.body.line_l,
            req.body.x_l,
            req.body.y_l,
            req.body.line_r,
            req.body.x_r,
            req.body.y_r
        ],
        (error, result) => {
            if (error) throw error;

            res.send('Podoscope image added succesfully.');
        });

});

module.exports = router;










