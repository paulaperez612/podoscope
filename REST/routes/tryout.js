var express = require('express');
var router = express.Router();
const pool = require('../db/db.js');

router.get('/', (request, response) => {
  pool.query('SELECT * FROM test', (error, result) => {
    if (error) throw error;

    response.send(result);
  });
});

router.post('/', (req, res) => {
  pool.query(`INSERT INTO test (id, name) VALUES (?,?)`,
    [
      req.body.id,
      req.body.name
    ],
    (error, result) => {
      if (error) throw error;

      res.send('User added');
    });
  // console.log(req.body);
  // console.log('da post method');

});

module.exports = router;
