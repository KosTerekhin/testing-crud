import axios from '../axios/axiosDefault';

export default {
	superheroes: {
		getAll,
		add
	},
	solohero: {
		getOne,
		deleteOne,
		updateBio
	},
	images: {
		deleteImages,
		addImages
	}
};

// superheroes endpoint
function getAll() {
	return axios.get('/superheroes');
}

function add(hero) {
	return axios.post(`/superheroes`, hero);
}

// solohero endpoint
function getOne(id) {
	return axios.get(`/solohero/${id}`);
}

function deleteOne(id) {
	return axios.delete(`/solohero/${id}`);
}

function updateBio(id, hero) {
	return axios.put(`/solohero/${id}`, hero);
}

// images endpoint
function deleteImages(id, images) {
	return axios.delete(`/images/${id}`, { data: images });
}

function addImages(id, images) {
	return axios.put(`/images/${id}`, images);
}
