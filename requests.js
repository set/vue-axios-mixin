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
        get(route) {
            return this.requestControl(instance.get(route))
        },
        post(route, parameters) {
            return this.requestControl(instance.post(route, parameters))
        },
        put(route, parameters) {
            return this.requestControl(instance.put(route, parameters))
        },
        delete(route, parameters) {
            return this.requestControl(instance.delete(route, parameters))
        },
        requestControl(request) {
            return new Promise((resolve, reject) => {
                request.then(response => resolve(response)).catch(error => {
                    if (error.response.status === 401) {
                        // logout
                    } else if (error.response.status === 409) {
                        // redirect to BUY
                    } else {
                        reject(error);
                    }
                })
            });
        }
    },
};
