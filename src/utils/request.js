import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { message } from 'antd';
import {getToken} from "../api/server";

const userInfo={

}
const ERROR_CODE = {
  401: '当前操作没有权限',
  403: '当前操作没有权限',
  404: '哦豁~ 服务404',
  default: '系统未知错误，请反馈给管理员',
};

const platom = process.env.NODE_ENV;
const baseUrl={
    "development":'/api/development.xxx.xxx',
    "production":'http://development.xxx.xxx'
}
console.log('REACT_APP_BASE_URL',process.env)
const instance = axios.create({
  baseURL: baseUrl[platom],
  timeout: 3000,
});
function listParams(config) {
  const { method, data, params } = config || {};
  if (method === 'post' && data && data.pageSize) {
    data.size = data.pageSize;
    delete data.pageSize;
  } else if (method === 'get' && params && params.pageSize) {
    params.size = params.pageSize;
    delete params.pageSize;
  }
}

instance.interceptors.request.use(
  (config) => {
    // 默认所有接口都加入token Bearer
    if ( localStorage.getItem('token') !== 'undefined') {
      config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token'); // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    }


    let params = {
      method: config.method,
      path: config.url,
      params: {
      },
    };
      listParams(config);
    if (config.method === 'post') {
      let dataStr = JSON.stringify(config.data);
      params.params = {
        ...params.params,
        jsonBody: dataStr,
      };
    } else {
      params.params = {
        ...params.params,
        ...config.params,
      };
    }
    return config;
  },
  (error) => {
    message.error('入参处理错误！');
    return error;
  },
);
let isRefreshing = false; // 是否正在刷新token 的标记
let requests = []; // 缓存所有请求
/** 刷新token */
function dealRefreshToken(config) {
    async function refresh() {
        if (!isRefreshing) {
            isRefreshing = true;
            try {
                const aToken = await getToken({
                    "email": "apiuseremail@apiuseremail.com",
                    "password": "123456"
                });
                localStorage.setItem('token',aToken.token)
                requests.forEach((cb) => cb());
                requests = [];
            } catch {
                message.error('token刷新失败，请重新登录！');
            } finally {
                isRefreshing = false;
            }
        }
    }
    refresh();
}
instance.interceptors.response.use(
  (resp) => {
    const { code, msg, data } = resp.data || {};
    if (code) {
      // token 失效刷新token
      if (code === 666) {
        console.log('token失效，刷新token');
        return dealRefreshToken(resp.config);
      }
      message.error(msg || '网络请求错误！');
      return Promise.reject(`${msg}`);
    }
    return data ? data : resp.data;
  },
  (error) => {
    const errMsg = error.toString();
    const code = errMsg.substr(errMsg.indexOf('code') + 5);
    const msg = ERROR_CODE[code] || ERROR_CODE.default;
    message.error(msg);
    return Promise.reject(error);
  },
);

export default instance;
