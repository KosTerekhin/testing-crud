const express = require('express');
const mongoose = require('mongoose');

const Heroes = require('../schema/Heroes');
const { nicknameCheck, idCheck } = require('../config/validations');

const router = express.Router();

mongoose.set('useFindAndModify', false);

// get all hero's details
// fetching the entire data
router.get('/:id', idCheck, async (req, res) => {
	try {
		let hero = await Heroes.findOne({ _id: req.params.id });
		return res.json(hero);
	} catch (error) {
		console.error(error.message);
		return res.status(500).send('Internal Server Error');
	}
});

// update hero's BIO
router.put('/:id', [ idCheck, nicknameCheck ], async (req, res) => {
	const hero = {};
	Object.keys(req.body).forEach((key) => {
		hero[key] = req.body[key];
	});
	try {
		const updatedHero = await Heroes.findOneAndUpdate({ _id: req.params.id }, { $set: hero }, { new: true });

		return res.json(updatedHero);
	} catch (err) {
		return res.status(500).send('Internal Server Error');
	}
});

// delete the entire hero
router.delete('/:id', idCheck, async (req, res) => {
	try {
		await Heroes.findByIdAndRemove(req.params.id);
		return res.json(req.params.id);
	} catch (err) {
		return res.status(500).send('Internal Server Error');
	}
});

module.exports = router;
