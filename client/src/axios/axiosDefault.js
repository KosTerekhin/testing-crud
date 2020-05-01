import axios from 'axios';

export default axios.create({
	baseURL: 'https://practice-crud.herokuapp.com/',
	headers: {
		common: {
			'Content-Type': 'application/json'
		}
	}
});
