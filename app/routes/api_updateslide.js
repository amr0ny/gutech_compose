var express = require('express');
var multer = require('multer');
var uuid = require('uuid');
var UpdateSlideAPIController = require('../controllers/UpdateSlideAPIController.js');
var router = express.Router();

const storage = multer.diskStorage({
    destination: './static/images/adminpanel/admin-block-2/',
    filename: function (req, file, cb) {
      cb(null, `${uuid.v4()}.jpg`);
    }
  })
const upload = multer({ storage: storage });

router.post('/api/updateslide', upload.single('image'), async (req, res, next) => {
    UpdateSlideAPIController.run(req, res, next);
});

module.exports = router;
