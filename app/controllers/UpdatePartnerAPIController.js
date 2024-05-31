var BaseController = require('./Base');
var BaseView = require('../views/Base');
var PartnerModel = require('../models/Partner');
var jwt = require('jsonwebtoken');
var slideModel = new PartnerModel();

module.exports = BaseController.extend({
    name: 'UpdatePartnerAPI', 
    run: async (req, res, next) => {
        const view = new BaseView(req, res);
        try {
            if (!req.cookies)
                throw new Error('Cookies are unavailable');
            //DEBUG CODE..........................
            console.log("I AM HEREEEE!!!!");
            req.logger.debug(req.body, req.file);
            const data = req.body;
            const secretKey = process.env.SECRET_KEY;
            const token = req.cookies.token;
            const filePartner = req.file;
            if (!filePartner)
                throw new Error('Some of the fields are missing')
            if (!token)
                throw new Error('An error occured while proceeding token');
            jwt.verify(token, secretKey, async (err, user) => { 
                if (err) {
                    throw new Error('Unauthorized access: ', err);
                }
                req.logger.info(`Access is authorized: `, user.userId);
                var filepath = `${filePartner.destination}${filePartner.filename}`;
                
                if(!data.id) {
                    PartnerModel.create({ filepath })
                    .then(() => {
                        req.logger.info(`Partner has been inserted`);
                        view.view({});
                    })
                    .catch((error)=>{
                        req.logger.error(`An error occured while instering partner`, error);
                    });
                }
                else {
                    const partner = await PartnerModel.findByPk(data.id);
                    if (!partner)
                        throw new Error('Partner was not found');
                    partner.filepath = filepath;
                    partner.save()
                    .then(() => {
                        req.logger.info(`Partner ${data.id} has been updated`);
                    })
                    .catch((error)=>{
                        req.logger.error(`An error occured while updating partner ${data.id}`);
                    });
                    
                }
            });
        } catch (error) {
            req.logger.error('Error', error);
            view.error(500, 'Internal server error');
        }
    }
});