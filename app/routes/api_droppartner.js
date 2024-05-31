var express = require('express');
var DropPartnerAPIController = require('../controllers/DropPartnerAPIController.js');
var router = express.Router();
var multer = require('multer');
const upload = multer();

router.post('/api/droppartner', upload.none(), (req, res, next) => {
  DropPartnerAPIController.run(req, res, next);
});

module.exports = router;