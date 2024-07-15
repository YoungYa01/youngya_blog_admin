import request from '@/api/request';

export const articleReq = () => request('/api/articles', {
  params: {
    'populate': '*'
    // 'populate[0]': 'tags',
    // 'populate[1]': 'classifications'
  }
});

export const articleUpdateReq = (id, data) => request(`/api/articles/${id}`, {
  method: 'PUT',
  data
});

export const articleCreateReq = (data) => request('/api/articles', {
  method: 'POST',
  data
});
export const articleFuzzyReq = (value, key = 'titleZH') => request('/api/articles', {
  params: {
    [`filters[${key}][$containsi][0]`]: value,
    'populate': '*'
  }
});

export const tagsReq = () => request('/api/tags', {
  params: {
    'pagination[limit]': 100
  }
});

export const classificationsReq = () => request('/api/classifications', {
  params: {
    'pagination[limit]': 100
  }
});
