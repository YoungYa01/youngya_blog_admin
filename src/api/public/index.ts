import request from '@/api/request';

export const loginReq = (data) => request.post('/api/auth/local', data);
