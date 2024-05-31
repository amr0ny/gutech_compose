var BaseController = require('./Base');
var BaseView = require('../views/Base');
var SlideModel = require('../models/Slide');
var jwt = require('jsonwebtoken');

module.exports = BaseController.extend({
    name: 'UpdateSlideAPI', 
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
            const fileSlide = req.file;
            const headerSlide = data.header;
            const textSlide = data.text;
            console.log(headerSlide);
            if (!headerSlide || !textSlide || !fileSlide)
                throw new Error('Some of the fields are missing')
                if (!token)
                    throw new Error('Unauthorized access: Token not provided');
            jwt.verify(token, secretKey, async (err, user) => { 
                try {
                    if (err) {
                        throw new Error('Unauthorized access: ', err);
                    }
                    req.logger.info(`Access is authorized: `, user.userId);
                    var filepath = `${fileSlide.destination}${fileSlide.filename}`;
                    
                    if(!data.id) {
                        SlideModel.create({ header: headerSlide, text: textSlide, filepath: filepath })
                        .then(() => {
                            req.logger.info(`Slide has been inserted`);
                            view.view({});
                        })
                        .catch((error)=>{
                            req.logger.error(`An error occured while instering slide`, error);
                        });
                    }
                    else {
                        const slide = await SlideModel.findByPk(data.id);
                        if(!slide)
                            throw new Error('Slide not found');

                        slide.header = headerSlide;
                        slide.text = textSlide;
                        slide.filepath = filepath;
                        slide.save()
                        .then(() => {
                            req.logger.info(`Slide ${data.id} has been updated`);
                        })
                        .catch((error)=>{
                            req.logger.error(`An error occured while updating slide ${data.id}`);
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