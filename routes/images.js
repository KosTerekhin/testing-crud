const express = require('express');
const router = express.Router();

const { storage, multipleFileFilter } = require('../config/multer');
const { idCheck } = require('../config/validations');

const multer = require('multer');
const upload = multer({ storage });

const cloudinary = require('cloudinary');

const cloudinary = require('cloudinary');
cloudinary.config({
	cloud_name: 'dkstecshe',
	// api_key: process.env.CLOUDINARY_API_KEY,
	// api_secret: process.env.CLOUDINARY_API_SECRET
	api_key: '749761723165925',
	api_secret: 'svFjogDds-XwbmhmewxpwwEv-_I'
});

const Heroes = require('../schema/Heroes');

router.put('/:id', upload.array('images'), [ multipleFileFilter, idCheck ], async (req, res) => {
	try {
		var hero = await Heroes.findOne({ _id: req.params.id });

		// add cloudinary url to the images array
		for (let i = 0; i < req.files.length; i++) {
			await cloudinary.v2.uploader.upload(req.files[i].path, (err, result) => {
				if (err) {
					return res.status(501).send('Cloudinary Server Error');
				}
				hero.images = [
					...hero.images,
					{
						id: result.public_id,
						url: result.secure_url
					}
				];
			});
		}

		// updating links in DB
		var hero = await Heroes.findOneAndUpdate({ _id: req.params.id }, { $set: hero }, { new: true });
		return res.json(hero.images);
	} catch (error) {
		return res.status(500).send('Internal Server Error');
	}
});

// delete pictures
router.delete('/:id', idCheck, async (req, res) => {
	try {
		var hero = await Heroes.findOne({ _id: req.params.id });
		// creating new Hero object by removing images by ID
		hero.images = hero.images.filter((item) => req.body.indexOf(item.id) == -1);
		// deleting images from cloud storage
		for (let i = 0; i < req.body.length; i++) {
			await cloudinary.v2.api.delete_resources(req.body[i], function(error, result) {
				if (error) {
					return res.status(500).send('Cloudinary error');
				}
				console.log(result);
			});
		}
		// updating DB
		var hero = await Heroes.findOneAndUpdate({ _id: req.params.id }, { $set: hero }, { new: true });
		return res.json(hero.images);
	} catch (error) {
		return res.status(500).send('Internal Server Error');
	}
});

module.exports = router;
