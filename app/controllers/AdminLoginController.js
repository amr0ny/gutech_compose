var BaseController = require('./Base');
var BaseView = require('../views/Base');

module.exports = BaseController.extend({
    name: 'AdminLogin',
    run: (req, res, next) => {
        try {
        var view = new BaseView(req, res, template='adminlogin');
        view.view({});
      } catch (error) {
        logger.error('Error:', error);
        view.error(500, 'Internal Server Error');
      }
    },
});