const express = require('express');
const multer = require('multer');
const config = require('config');
const proxy = config.get('proxy');
const { storage, fileFilter } = require('../config/multer');
const { textFieldCheck, nicknameCheck } = require('../config/validations');

const router = express.Router();

const upload = multer({ storage });

const Heroes = require('../schema/Heroes');

// get all super heroes
// fetching data that will displayed on main page
router.get('/', async (req, res) => {
	try {
		let data = await Heroes.find({});
		let partialData = data.map((item) => {
			return {
				_id: item._id,
				nickname: item.nickname,
				images: [ item.images[0] ]
			};
		});

		return res.json(partialData);
	} catch (error) {
		return res.status(500).send('Internal Server Error');
	}
});

// add new super hero
//  I assume that we can add only 1 photo on creation
//  I assume that every superhero has photos that only belong to him
// 	and because of that images are stored inside of each superhero
router.post('/', upload.single('images'), [ fileFilter, textFieldCheck, nicknameCheck ], async (req, res) => {
	const newHero = { images: [ proxy + req.file.filename ] };
	Object.keys(req.body).forEach((key) => {
		newHero[key] = req.body[key];
	});

	hero = new Heroes(newHero);

	try {
		await hero.save();
		return res.json(hero);
	} catch (error) {
		return res.status(500).send('Internal Server Error');
	}
});

module.exports = router;
