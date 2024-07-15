import request from '@/api/request';

export const userInfoReq = () => request('/api/users/me');

export const adminInfoReq = () => request('/api/admin-info', {
  params: {
    'populate[0]': 'avatar'
  }
});
