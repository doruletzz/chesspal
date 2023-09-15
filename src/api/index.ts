import axios from 'axios';
import { BASE_URL } from '../constants';

const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		common: {
			Authorization: null,
		},
	},
});

export default api;
