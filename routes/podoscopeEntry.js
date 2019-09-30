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
                                    ANGLE_L,
                                    HUELLA_L,
                                    TIPO_TALON_L,
                                    TIPO_L,
                                    LINE_R ,
                                    X_R ,
                                    Y_R,
                                    ANGLE_R,
                                    HUELLA_R,
                                    TIPO_TALON_R,
                                    TIPO_R,
                                    OBSERVACIONES,
                                    TALLA,
                                    FREE_DRAW,
                                    LAST_MOD
                                )
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW())`,
        [
            req.body.user_id,
            req.body.img_id,
            req.body.image,

            req.body.line_l,
            req.body.x_l,
            req.body.y_l,
            req.body.angle_l,
            req.body.huella_l,
            req.body.tipo_talon_l,
            req.body.tipo_l,

            req.body.line_r,
            req.body.x_r,
            req.body.y_r,
            req.body.angle_r,
            req.body.huella_r,
            req.body.tipo_talon_r,
            req.body.tipo_r,

            req.body.obervaciones,
            req.body.talla,
            req.body.free_draw
        ],
        (error, result) => {
            if (error) throw error;

            res.send('Podoscope image added succesfully.');
        });

});

module.exports = router;
