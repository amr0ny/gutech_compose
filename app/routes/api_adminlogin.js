var express = require('express');
var multer = require('multer');
var AdminLoginAPIController = require('../controllers/AdminLoginAPIController.js');
var router = express.Router();

var upload = multer();
router.post('/api/adminlogin', upload.none(), (req, res, next) => {
  AdminLoginAPIController.run(req, res, next);
});

module.exports = router;
