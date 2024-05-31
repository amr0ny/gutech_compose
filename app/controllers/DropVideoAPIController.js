var BaseController = require('./Base');
var BaseView = require('../views/Base');
var VideoModel = require('../models/Video');
var jwt = require('jsonwebtoken');

module.exports = BaseController.extend({
    name: 'DropVideoAPI', 
    run: async (req, res, next) => {
        const view = new BaseView(req, res);
        try {
            if (!req.cookies)
                throw new Error('Cookies are unavailable');
            const data = req.body;
            const secretKey = process.env.SECRET_KEY;
            const token = req.cookies.token;
            console.log(data);
            if (!token)
                throw new Error('An error occured while proceeding token');
            jwt.verify(token, secretKey, async (err, user) => {
                try {
                    if (err) {
                        throw new Error('Unauthorized access: ', err);
                    }
                    req.logger.info(`Access is authorized: `, user.userId);
                    
                    if(!data.id)
                        throw new Error('No video id has been given');
                    const video = await VideoModel.findByPk(data.id);
                    if (!video)
                        throw new Error('Video not found');
                    video.destroy()
                    .then(() => {
                        req.logger.info(`Video ${data.id} has been deleted`);
                        view.view({});
                    })
                    .catch((error)=>{
                        req.logger.error(`An error occured while deleting video ${data.id}`, error);
                    });
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