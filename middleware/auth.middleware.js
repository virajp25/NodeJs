const userModel = require('../model/user.module');

exports.userAuthMiddle = async (req, res, next) => {
	try {
		const apiKey = req.query.apiKey;

		if (!apiKey) {
			return res.json({ status: 400, message: 'apikey is mandatory' });
		}

		const getUser = await userModel.findOne({ apiKey: apiKey });

		if (!getUser) {
			return res.json({ status: 400, message: 'apikey dont exist' });
		}

		req.user = getUser;
		next();
	} catch (error) {}
};
