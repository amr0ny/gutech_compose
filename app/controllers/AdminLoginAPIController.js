var bcrypt = require('bcrypt');
var BaseController = require('./Base');
var AdminModel= require('../models/Admin');
var BaseView = require('../views/Base');
var jwt = require('jsonwebtoken');


module.exports = BaseController.extend({
  name: 'AdminAPILogin',
  run: async (req, res, next) => {
    var view = new BaseView(req, res);
    try {
      const secretKey = process.env.SECRET_KEY;
      console.log(req.body);
      const user = await AdminModel.findOne({
        where: {
            username: req.body.username,
        },
      });
      //debug info
      req.logger.debug(user); 
      if (!user) {
        throw new Error('User not found');
      }
      const password = req.body.password;
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        //debug info
        req.logger.debug('Password is correct');
        const token = jwt.sign({ userId: user.uuid }, secretKey, { expiresIn: '12h' });
        res.cookie('token', token, {
        expires: new Date(Date.now() + 900000),
        sameSite: 'strict',
        //  httpOnly: true,
        //  credentials: 'include',
        });
        view.view({});

      } else {
        //debug info
        req.logger.error('Password is incorrect');
        view.view(401, 'Invalid credentials');
      }
    } catch (error) {
      req.logger.error('Error', error);
      view.error(500, 'Internal Server Error' );
    }
  }
});