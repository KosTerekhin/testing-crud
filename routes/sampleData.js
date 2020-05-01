const express = require('express');
const router = express.Router();
const config = require('config');
const sample = config.get('sampleData');
const Heroes = require('../schema/Heroes');

// add new super hero
router.post('/', async (req, res) => {
	try {
		await Heroes.collection.drop();
		await Heroes.insertMany(sample, function(err, mongooseDocuments) {
			res.send('posted samples');
		});
	} catch (error) {
		res.status(500).json('Server error - cannot post sample');
	}
});

module.exports = router;
