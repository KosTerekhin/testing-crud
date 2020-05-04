const multer = require('multer');

const storage = multer.diskStorage({
	filename: function(req, file, callback) {
		callback(null, Date.now() + '-' + file.originalname);
	}
});

const fileFilter = (req, res, next) => {
	if (req.file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
		next();
	} else {
		return res.status(402).send('Only image files are allowed!');
	}
};

const multipleFileFilter = (req, res, next) => {
	const length = req.files.length;
	if (
		req.files.filter((file) => {
			return file.originalname.match(/\.(jpg|jpeg|png)$/i);
		}).length == length
	) {
		next();
	} else {
		return res.status(402).send('Only image files are allowed!');
	}
};

module.exports = { storage, fileFilter, multipleFileFilter };
