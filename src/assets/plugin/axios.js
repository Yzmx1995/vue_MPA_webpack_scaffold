import Axios from 'axios';
import { hostObj } from '../js/enum';

const instance = Axios.create({
    timeout: 20000,
    withCredentials: false
});

/**
 * @desc do something before request
 */
// instance.interceptors.request.use(config => {
//     console.log(config, 'config');
//     return config;
// });

/**
 * @desc do something before response
 */
// instance.interceptors.response.use(response => {
//     return response;
// }, err => {
//     return err;
// });

function request(params) {
    const { special, ...httpConfig } = params;
    // if(special === 'xxx') { // do something }
    httpConfig.url = `${hostObj[process.env.NODE_ENV]}${httpConfig.url}`;
    return instance(httpConfig).then(res => {
        return res.data || res;
    });
}

function plugin(Vue) {
    if (plugin.installed) {
        return;
    }
    Vue.http = request;
    Object.defineProperty(Vue.prototype, '$http', { value: request });
}

export default plugin;