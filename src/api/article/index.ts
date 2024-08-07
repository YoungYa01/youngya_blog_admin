import request from '@/api/request';

export const articleReq = ({ page = 1, pageSize = 10 }, data?) =>
  request.post(`/api/articles?page=${page}&pageSize=${pageSize}`, data);

export const articleUpdateReq = (id, data) =>
  request.patch(`/api/articles/${id}`, data);

export const articleCreateReq = (data) => request.post('/api/articles/add', data);

export const articleDeleteReq = (id) => request.delete(`/api/articles/${id}`);

export const articleFuzzyReq = (data) =>
  request.post(`/api/articles?`, data);

export const tagsReq = ({ page = 1, pageSize = 10 }) =>
  request.post(`/api/tags?page=${page}&pageSize=${pageSize}`);

export const tagUpdateReq = (id, data) =>
  request.patch(`/api/tags/${id}`, data);

export const tagCreateReq = (data) => request.post('/api/tags/add', data);

export const tagFuzzyReq = (data, { page = 1, pageSize = 10 }) =>
  request.post(`/api/tags?page=${page}&pageSize=${pageSize}`, data);

export const tagDeleteReq = (id) => request.delete(`/api/tags/${id}`);

export const classificationsReq = () =>
  request('/api/classifications', {
    params: {
      'pagination[limit]': 100,
    },
  });

export const classificationUpdateReq = (id, data) =>
  request(`/api/classifications/${id}`, {
    method: 'PUT',
    data,
  });

export const classificationCreateReq = (data) =>
  request('/api/classifications', {
    method: 'POST',
    data,
  });

export const classificationFuzzyReq = (value) =>
  request('/api/classifications', {
    params: {
      [`filters[title][$containsi][0]`]: value,
      populate: '*',
    },
  });

export const classificationDeleteReq = (id) =>
  request(`/api/classifications/${id}`, {
    method: 'DELETE',
  });
