const fs = require('fs');
const path = require('path');
const multer = require('multer');

exports.upload = () => {
	return (imageUpload = multer({
		storage: multer.diskStorage({
			destination: function(req, file, cb) {
				const folderName = req.query.folderName;
				const path = `rootFolder/${folderName}`;
				fs.mkdirSync(path, { recursive: true });
				cb(null, path);
			}
		})
	}));
};
