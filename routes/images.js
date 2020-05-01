const express = require('express');
const router = express.Router();
const config = require('config');
const proxy = config.get('proxy');
const multer = require('multer');
const { storage, multipleFileFilter } = require('../config/multer');
const { idCheck } = require('../config/validations');

const upload = multer({ storage });
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
	const imageNames = req.files.map((file) => proxy + file.filename);
	try {
		var hero = await Heroes.findOne({ _id: req.params.id });
		hero.images = [ ...hero.images, ...imageNames ];

		var hero = await Heroes.findOneAndUpdate({ _id: req.params.id }, { $set: hero }, { new: true });
		return res.json(imageNames);
	} catch (error) {
		return res.status(500).send('Internal Server Error');
	}
});

module.exports = router;
