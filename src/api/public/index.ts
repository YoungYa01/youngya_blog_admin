import request from '@/api/request';

export const loginReq = (data) => request.post('/api/auth/login', data);

export const registReq = (data) => request.post('/api/auth/register', data);

export const getCaptcha = () => request.get('/api/auth/code');


export const uploadImgReq = (data) => request.post('/api/upload/image', data);
