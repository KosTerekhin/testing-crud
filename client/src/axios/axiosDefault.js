import axios from 'axios';

export default axios.create({
	baseURL: 'https://practice-crud.herokuapp.com/api/',
	headers: {
		common: {
			'Content-Type': 'application/json'
		}
	}
});
