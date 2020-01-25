import axios from 'axios';
import { apiUrl } from '../constants/config';

const accessToken = localStorage.getItem('access_token');

const instance = axios.create({
    baseURL: apiUrl,
    timeout: 5000,
    headers: {'Authorization': `Bearer ${accessToken}`},
});  

export default {
    methods: {
        get(route, queryParameters = null) {
            return this._sendRequest(instance.get(route, { params: queryParameters, }));
        },
        post(route, parameters, queryParameters = null) {
            return this._sendRequest(instance.post(route, parameters, { params: queryParameters }));
        },
        put(route, parameters, queryParameters = null) {
            return this._sendRequest(instance.put(route, parameters, { params: queryParameters }));
        },
        delete(route, parameters, queryParameters = null) {
            return this._sendRequest(instance.delete(route, parameters, { params: queryParameters }));
        },
        _sendRequest(request) {
            return new Promise((resolve, reject) => {
                request.then(response => { resolve(response) }).catch(error => {
                    this._errorResponse(error, reject);
                });
            });
        },
        _errorResponse(error, reject) {
            switch(error.response.status) {
                case 401:
                    // logout
                    console.log('logout');
                    break;
                case 409:
                    // redirect to BUY
                    console.log('redirect to buy');
                    break;
                default:
                    reject(error);
                break;
            }
        }
    },
};
