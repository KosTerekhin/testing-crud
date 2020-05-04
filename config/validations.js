const Heroes = require('../schema/Heroes');

const nicknameCheck = async (req, res, next) => {
	try {
		let hero = await Heroes.findOne({ nickname: req.body.nickname });
		if (hero && hero._id != req.params.id) {
			return res.status(401).send('Another Superhero already has this nickname, try a different one');
		}
		next();
	} catch (error) {
		next();
	}
};

const idCheck = async (req, res, next) => {
	try {
		await Heroes.findOne({ _id: req.params.id });
	} catch (error) {
		return res.status(401).send('Hero not found - wrong ID');
	}
	next();
};

const textFieldCheck = (req, res, next) => {
	const validator = [];
	Object.keys(req.body).forEach((key) => {
		if (req.body[key].trim().length < 1) {
			validator.push(key);
		}
	});

	if (!req.file) {
		validator.push('Image');
	}

	if (validator.length) {
		return res.status(401).send(`Please add: ${[ ...validator ]} and try again`);
	}

	next();
};

module.exports = { nicknameCheck, idCheck, textFieldCheck };
