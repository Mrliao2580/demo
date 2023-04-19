/*
 * @Author: lbh
 * @Date: 2020-12-24 18:12:01
 * @LastEditors: lzh
 * @LastEditTime: 2023-04-19 16:54:42
 * @Description: axios 二次封裝
 */
import axios from 'axios';
import qs from 'qs';
import MobileDetect from 'mobile-detect';

// 請求攔截
axios.interceptors.request.use(
  (config) => {
    let contentType =
      config.headers['Content-Type'] ||
      config.headers['Content-type'] ||
      config.headers['content-type'] ||
      config.headers['content-Type'];
    if (
      config.method == 'post' &&
      contentType.indexOf('application/x-www-form') > -1 &&
      config.url.indexOf('aliyuncs.com') == -1
    )
      config.data = qs.stringify(config.data);
    else if (
      config.method == 'post' &&
      contentType.indexOf('application/json') > -1
    )
      config.data = JSON.stringify(config.data);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let https = {
  host () {
    let host = location.origin;
    if (location.href.indexOf("shop9") > -1) {
      if (process.env.NODE_ENV_T == "shop9_m") {
        return host;
      } else if (process.env.NODE_ENV_T == "shop9_test") {
        return host;
      } else host = "https://prf-m.ricepon.com";
    }
    return host;
  },
  /**
   * 獲取 頭部信息
   */
  setHeaders (object = {}) {
    return new Promise((a, b) => {
      default_.headers().then((res) => {
        let md = new MobileDetect(window.navigator.userAgent);
        let headers = {
          'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
          secretKey: '2309485937845783',
          mobileModel: md.os(), // 系统 如 ios
          mobileVersion: md.os() + md.version(md.userAgent()), // 系统版本  如 ios11
          product: md.mobile(), // 手机型号(名称)
          ver: md.os() + md.version(md.userAgent()), // 系统版本  如 ios11
          appToken:"20",
        };
        if (typeof object == 'object') {
          if (object.origin) headers['Access-Control-Allow-Origin'] = '*';
        }
        headers = {
          ...headers,
          ...res,
          ...object,
        };
        a(headers);
      });
    });
  },
  /**
   * get 請求
   * @param {string} url
   * @param {object} params
   */
  get (url, params = {}, headers) {
    params = default_.initParams(params);
    return new Promise((resolve, reject) => {
      this.setHeaders(headers).then((h) => {
        axios
          .get(url, {
            headers: h,
            params: params,
          })
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err.data);
          });
      });
    });
  },
  /**
   * post 請求
   * @param {string} url
   * @param {object} params
   */
  post (url, params = {}) {
    params = default_.initParams(params);
    return new Promise((resolve, reject) => {
      this.setHeaders().then((h) => {
        axios
          .post(url, params, {
            headers: h,
          })
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err.data);
          });
      });
    });
  },
  /**
   * form 表单提交
   * @param {*} url
   * @param {*} params
   * @returns
   */
  form (url, params = {}) {
    params = default_.initParams(params);
    return new Promise((resolve, reject) => {
      this.setHeaders({ 'Content-type': 'multipart/form-data' }).then((h) => {
        axios
          .post(url, params, {
            headers: h,
          })
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err.data);
          });
      });
    });
  },
  /**
   * json 格式提交
   * @param {*} url
   * @param {*} params
   * @returns
   */
  body (url, params = {}) {
    params = default_.initParams(params);
    return new Promise((resolve, reject) => {
      this.setHeaders({
        'Content-type': 'application/json',
      }).then((h) => {
        axios
          .post(url, params, {
            headers: h,
          })
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err.data);
          });
      });
    });
  },
  /**
   * 圖片上傳
   * @param {*} url
   * @param {*} params
   * @returns
   */
  upload (url, params = {}) {
    return new Promise((resolve, reject) => {
      this.setHeaders({
        'Access-Control-Allow-Origin': '*',
      }).then((h) => {
        axios
          .post(url, params, {
            headers: h,
          })
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err.data);
          });
      });
    });
  },
};

// 默認操作
let default_ = {
  // 設置頭部
  headers: () => {
    return new Promise((a, b) => {
      a({});
    });
  },
  //  參數處理
  initParams: (params = {}) => {
    return params;
  },
  // 請求
  axios: axios,
};



// export const axios_ = axios;
// export const setting = default_;

export default {
  axios_: https,
  setting: default_,
};