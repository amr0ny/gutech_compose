var BaseController = require('./Base');
var BaseView = require('../views/Base');
var VideoModel = require('../models/Video');
var jwt = require('jsonwebtoken');

module.exports = BaseController.extend({
    name: 'UpdateVideoAPI', 
    run: async (req, res, next) => {
        const view = new BaseView(req, res);
        try {
            if (!req.cookies)
                throw new Error('Cookies are unavailable');
            //DEBUG CODE..........................
            req.logger.debug(req.body, req.file);
            const data = req.body;
            const secretKey = process.env.SECRET_KEY;
            const token = req.cookies.token;
            const urlVideo = data.url;
            const durationVideo = data.duration;
            const textVideo = data.text;
            console.log(textVideo);
            if (!textVideo || !urlVideo || !durationVideo)
                throw new Error('Some of the fields are missing')
                if (!token)
                    throw new Error('Unauthorized access: Token not provided');
            jwt.verify(token, secretKey, async (err, user) => { 
                try {
                    if (err) {
                        throw new Error('Unauthorized access: ', err);
                    }
                    req.logger.info(`Access is authorized: `, user.userId);
                    
                    if(!data.id) {
                        VideoModel.create({ url: urlVideo, text: textVideo, duration: durationVideo })
                        .then(() => {
                            req.logger.info(`Video has been inserted`);
                            view.view({});
                        })
                        .catch((error)=>{
                            req.logger.error(`An error occured while instering video`, error);
                        });
                    }
                    else {
                        const video = await VideoModel.findByPk(data.id);
                        if(!video)
                            throw new Error('Video not found');
                        video.url = urlVideo;
                        video.text = textVideo;
                        video.duration = durationVideo;
                        video.save()
                        .then(() => {
                            req.logger.info(`Video ${data.id} has been updated`);
                            view.view({});
                        })
                        .catch((error)=>{
                            req.logger.error(`An error occured while updating video ${data.id}`, error);
                        });
                    }
                } catch(error) {
                    req.logger.error('Error:', error);
                    view.error(500, 'Internal server error');
                }
            });
        } catch (error) {
            req.logger.error('Error', error);
            view.error(500, 'Internal server error');
        }
    }
});