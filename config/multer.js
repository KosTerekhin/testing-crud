const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + file.originalname);
	}
});

const fileFilter = (req, res, next) => {
	if (req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png' || req.file.mimetype === 'image/jpg') {
		next();
	} else {
		return res.status(402).send('Picture should be either JPEG/JPG or PNG');
	}
};

const multipleFileFilter = (req, res, next) => {
	const length = req.files.length;
	if (
		req.files.filter((file) => {
			return file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg';
		}).length == length
	) {
		next();
	} else {
		return res.status(402).send('Pictures should be either JPEG/JPG or PNG');
	}
};

module.exports = { storage, fileFilter, multipleFileFilter };
