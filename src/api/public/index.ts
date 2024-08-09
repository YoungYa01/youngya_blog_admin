import request from '@/api/request';

export const loginReq = (data) => request.post('/api/auth/login', data);

export const registReq = (data) => request.post('/api/auth/register', data);

export const getCaptcha = () => request.get('/api/auth/code');


export const uploadImgReq = (data) => request.post('/api/upload/image', data);

// 点赞
export const praiseReq = () => request.post('/api/flow/praise');
// 访问
export const accessReq = () => request.post('/api/flow/access');
// 获取访问数
export const getAccessCountReq = () => request.get('/api/flow/access/count');
// 获取点赞数
export const getPraiseCountReq = () => request.get('/api/flow/praise/count');
