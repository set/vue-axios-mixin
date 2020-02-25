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
    post(route, parameters = null, queryParameters = null) {
      return this._sendRequest(instance.post(route, parameters, { params: queryParameters }));
    },
    put(route, parameters = null, queryParameters = null) {
      return this._sendRequest(instance.put(route, parameters, { params: queryParameters }));
    },
    delete(route, parameters = null, queryParameters = null) {
      return this._sendRequest(instance.delete(route, parameters, { params: queryParameters }));
    },
    _sendRequest(request) {
      return new Promise((resolve, reject) => {
        request.then(response => {
          resolve(response)
        }).catch(error => {
          this._errorResponse(error, reject);
        });
      });
    },
    _errorResponse(error, reject) {
      switch(error.response.status) {
        case 401:
          // Permission Error (logout)
          break;
        case 402:
          // Your account is expired, (redirect to BUY)
          break;
        case 422:
          // this is a validation error
          let messages = [];
          Object.values(error.response.data).map(message => {
            messages.push(message[0]);
          });
          this.error( messages.join(', ') );
          break;
        default:
          error.message = error.response.data.message;
          reject(error);
          break;
      }
    }
  },
};
