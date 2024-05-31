var BaseController = require('./Base');
var BaseView = require('../views/Base');
var VideoModel = require('../models/Video');
var SlideModel = require('../models/Slide')
var PartnerModel = require('../models/Partner');

module.exports = BaseController.extend({
    name: 'Index',
    run: async (req, res, next) => {
        try {
            var view = new BaseView(req, res, template='index');
            const videos = await VideoModel.findAll();
            const slides = await SlideModel.findAll();
            const partners = await PartnerModel.findAll();
            if (!videos || !slides || !partners)
                throw new Error('Data cannt be found');
            //debug info 
            req.logger.debug('Partners list: ', partners);
            view.view({videos: videos,  slides: slides, partners: partners });
        } catch (error) {
            req.logger.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});
