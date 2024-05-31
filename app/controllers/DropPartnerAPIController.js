var BaseController = require('./Base');
var BaseView = require('../views/Base');
var PartnerModel = require('../models/Partner');
var jwt = require('jsonwebtoken');

module.exports = BaseController.extend({
    name: 'DropPartnerAPI', 
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
                if (err)
                    throw new Error('Unauthorized access: ', err);
                req.logger.info(`Access is authorized: `, user.userId);
                if(!data.id)
                    throw new Error('No partner id has been given');
                const partner = await PartnerModel.findByPk(data.id);
                if (!partner)
                    throw new Error('Partner not found');
                partner.destroy()
                .then(() => {
                    req.logger.info(`Partner ${data.id} has been deleted`);
                    view.view({});
                })
                .catch((error)=>{
                    req.logger.error(`An error occured while deleting partner ${data.id}`, error);
                });
            });
        } catch (error) {
            req.logger.error('Error', error);
            view.error(500, 'Internal server error');
        }
    }
});