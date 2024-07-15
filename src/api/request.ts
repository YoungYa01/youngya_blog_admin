import axios, { AxiosInstance } from 'axios';
import { getUserToken } from '@/utils/localstorage';

function createAxiosInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API as string, // 使用之前确保类型安全的baseURL
    timeout: 5000
  });

  // 超时和异常处理
  instance.interceptors.request.use(
    config => {
      const token = getUserToken();
      if (token) {
        if (!config.headers) {
          config.headers = {};
        }
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      // 处理请求错误
      console.error('Request Error:', error);
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    response => response,
    error => {
      // 处理响应错误，包括超时
      if (error.response) {
        // 请求已发出，但服务器响应的状态码不在2xx范围内
        console.error('Response Error:', error.response);
      } else if (error.request) {
        // 请求已发出，但未收到服务器响应
        console.error('Request Timeout or Network Error:', error.request);
      } else {
        // 一些其他错误
        console.error('Unknown Error:', error);
      }
      return Promise.reject(error);
    }
  );

  return instance;
}

// 使用创建的实例
export default createAxiosInstance();
