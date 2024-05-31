var BaseController = require('./Base');
var BaseView = require('../views/Base');
var VideoModel = require('../models/Video');
var SlideModel = require('../models/Slide');
var PartnerModel = require('../models/Partner');
var jwt = require('jsonwebtoken');

module.exports = BaseController.extend({
    name: 'Admin',
    run: async (req, res, next) => {
        var view = new BaseView(req, res, template='adminpanel');
        try {
            const videos = await VideoModel.findAll();
            const slides = await SlideModel.findAll();
            const partners = await PartnerModel.findAll();

            //debug info
            console.log(partners);
            req.logger.debug(req.cookies);
            if (!req.cookies)
                throw new Error('Cookies are unavailable');
            var secretKey = process.env.SECRET_KEY;
            var token = req.cookies.token;
            if (!token)
                throw new Error('An error occured while proceeding token');
            jwt.verify(token, secretKey, (err, user) => {
                if (err) {
                  throw new Error('The user is unauthorized: ', err);
                }
                req.logger.info(`User ${user.userId} is authorized`);
                view.view({ videos: videos, slides: slides, partners: partners });
            });
      } catch (error) {
            req.logger.error('Error:', error);
            view.redirect('/');
      }
    },
});