var express = require('express');
var IndexController = require('../controllers/IndexController');
var router = express.Router();

router.get('/',(req, res, next) => {
  IndexController.run(req, res, next);
});

module.exports = router;
