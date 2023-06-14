import axios from "axios/dist/node/axios.cjs"

export class AxiosClass {
    constructor(config) {
        const axiosInstance = axios.create(config);
        // 请求拦截器
        axiosInstance.interceptors.request.use(
            (config) => {
                return config;
            },
            (err) => {
                return Promise.reject(err);
            }
        );
        // 响应拦截器
        axiosInstance.interceptors.response.use(
            (res) => {
                return res.data;
            },
            (err) => {
                return Promise.reject(err);
            }
        );
        return axiosInstance;
    }
}

const service = new AxiosClass({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 1000 * 30,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    },
});

export default service;
