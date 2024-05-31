var express = require('express');
var AdminPanelController = require('../controllers/AdminPanelController.js');
var router = express.Router();

router.get('/adminpanel',(req, res, next) => {
  AdminPanelController.run(req, res, next);
});

module.exports = router;
