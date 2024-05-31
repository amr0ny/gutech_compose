var express = require('express');
var multer = require('multer');
var UpdateVideoAPIController = require('../controllers/UpdateVideoAPIController.js');
var router = express.Router()
const upload = multer();

router.post('/api/updatevideo', upload.none(), async (req, res, next) => {
    UpdateVideoAPIController.run(req, res, next);
});

module.exports = router;