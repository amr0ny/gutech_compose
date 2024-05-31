var express = require('express');
var DropVideoAPIController = require('../controllers/DropVideoAPIController.js');
var router = express.Router();
var multer = require('multer');
const upload = multer();

router.post('/api/dropvideo', upload.none(), (req, res, next) => {
  DropVideoAPIController.run(req, res, next);
});

module.exports = router;