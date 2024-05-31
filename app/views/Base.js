

class BaseView {
	constructor(req, res, template=null) {
		this.req = req;
		this.res = res;
		this.template = template;
	}
	view (data) {
		try {
			if(!this.res)
				throw new Error('Response object is null');
			if (this.template)
				this.res.render(this.template, data);
			else
				this.res.status(200).send({success: true, data: data});

		} catch (error) {
			this.req.logger.error('Error', error);
			this.error(500, 'Internal Server Error');
		}
	}

	error (code, errormsg) {
		try {
        	this.res.status(code).json({ success: false, error: errormsg });
		} catch (error) {
			this.req.logger.error('An error occured while sending error message:', error);
		}
	}

	redirect(path) {
		try {
			this.res.redirect(path);
		} catch (error) {
			this.error(500, 'Internal Server Error');
		}
	}
}

module.exports = BaseView;