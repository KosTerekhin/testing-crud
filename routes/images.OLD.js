const express = require('express');
const router = express.Router();

const { storage, multipleFileFilter } = require('../config/multer');
const { idCheck } = require('../config/validations');

const multer = require('multer');
const upload = multer({ storage });

const cloudinary = require('cloudinary');
cloudinary.config({
	cloud_name: 'dkstecshe',
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

const Heroes = require('../schema/Heroes');

// delete pictures
router.delete('/:id', idCheck, async (req, res) => {
	const imageNames = req.body;

	try {
		var hero = await Heroes.findOne({ _id: req.params.id });
		hero.images = hero.images.filter((item) => imageNames.indexOf(item) == -1);

		var hero = await Heroes.findOneAndUpdate({ _id: req.params.id }, { $set: hero }, { new: true });
		return res.json(hero.images);
	} catch (error) {
		return res.status(500).send('Internal Server Error');
	}
});

router.put('/:id', upload.array('images'), [ multipleFileFilter, idCheck ], async (req, res) => {
	const imageNames = [];
	try {
		await req.files.forEach((file) =>
			cloudinary.v2.uploader.upload(req.file.path, (err, result) => {
				if (err) {
					return res.status(501).send('Cloudinary Server Error');
				}
				// add cloudinary url for the images array
				imageNames = [ ...imageNames, result.secure_url ];
			})
		);

		res.json(imageNames);
		// var hero = await Heroes.findOne({ _id: req.params.id });
		// hero.images = [ ...hero.images, ...imageNames ];

		// var hero = await Heroes.findOneAndUpdate({ _id: req.params.id }, { $set: hero }, { new: true });
		// return res.json(imageNames);
	} catch (error) {
		return res.status(500).send('Internal Server Error');
	}
});

module.exports = router;
