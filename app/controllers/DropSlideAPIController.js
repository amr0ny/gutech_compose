var BaseController = require('./Base');
var BaseView = require('../views/Base');
var SlideModel = require('../models/Slide');
var jwt = require('jsonwebtoken');

module.exports = BaseController.extend({
    name: 'DropSlideAPI', 
    run: async (req, res, next) => {
        const view = new BaseView(req, res);
        try {
            if (!req.cookies)
                throw new Error('Cookies are unavailable');
            const data = req.body;
            const secretKey = process.env.SECRET_KEY;
            const token = req.cookies.token;
            if (!token)
                throw new Error('An error occured while proceeding token');
            jwt.verify(token, secretKey, async (err, user) => { 
                try {
                    if (err) {
                        throw new Error('Unauthorized access: ', err);
                    }
                    req.logger.info(`Access is authorized: `, user.userId);
                    
                    if(!data.id)
                        throw new Error('No slide id has been given');

                    const slide = await SlideModel.findByPk(data.id);
                    if (!slide)
                        throw new Error('Slide not found');
                    slide.destroy()
                    .then(() => {
                        req.logger.info(`Slide ${data.id} has been deleted`);
                        
                        view.view({});
                    })
                    .catch((error)=>{
                        req.logger.error(`An error occured while deleting slide ${data.id}`, error);
                    });
                    
                }  catch(error) {
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