var express = require('express');
var multer = require('multer');
var uuid = require('uuid');
var UpdatePartnerAPIController = require('../controllers/UpdatePartnerAPIController.js');
var router = express.Router();

const storage = multer.diskStorage({
    destination: './static/images/adminpanel/admin-block-3/',
    filename: function (req, file, cb) {
      cb(null, `${uuid.v4()}.jpg`);
    }
  })
const upload = multer({ storage: storage });

router.post('/api/updatepartner', upload.single('image'), async (req, res, next) => {
    UpdatePartnerAPIController.run(req, res, next);
});

module.exports = router;
