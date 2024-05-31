var express = require('express');
var AdminLoginController = require('../controllers/AdminLoginController.js');
var router = express.Router();

router.get('/adminlogin', async (req, res, next) => {
  await AdminLoginController.run(req, res, next);
});

module.exports = router;
