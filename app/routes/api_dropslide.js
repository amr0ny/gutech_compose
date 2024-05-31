var express = require('express');
var DropSlideAPIController = require('../controllers/DropSlideAPIController.js');
var router = express.Router();
var multer = require('multer');
const upload = multer();

router.post('/api/dropslide', upload.none(), (req, res, next) => {
  DropSlideAPIController.run(req, res, next);
});

module.exports = router;