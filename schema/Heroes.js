const mongoose = require('mongoose');

const HeroesSchema = mongoose.Schema({
	nickname: {
		type: String,
		required: true,
		unique: true
	},
	real_name: {
		type: String,
		required: true
	},
	origin_description: {
		type: String,
		required: true
	},
	superpowers: {
		type: String,
		required: true
	},
	catch_phrase: {
		type: String,
		required: true
	},
	images: [
		{
			_id: false,
			id: {
				type: String,
				required: true
			},
			url: {
				type: String,
				required: true
			}
		}
	]
});

module.exports = mongoose.model('superheroes', HeroesSchema);
