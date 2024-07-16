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

export const tagUpdateReq = (id, data) => request(`/api/tags/${id}`, {
  method: 'PUT',
  data
});

export const tagCreateReq = (data) => request('/api/tags', {
  method: 'POST',
  data
})

export const tagFuzzyReq = (value) => request('/api/tags', {
  params: {
    [`filters[name][$containsi][0]`]: value,
    'pagination[limit]': 100
  }
});

export const tagDeleteReq = (id) => request(`/api/tags/${id}`, {
  method: 'DELETE'
});

export const classificationsReq = () => request('/api/classifications', {
  params: {
    'pagination[limit]': 100
  }
});

export const classificationUpdateReq = (id, data) => request(`/api/classifications/${id}`, {
  method: 'PUT',
  data
});

export const classificationCreateReq = (data) => request('/api/classifications', {
  method: 'POST',
  data
})

export const classificationFuzzyReq = (value) => request('/api/classifications', {
  params: {
    [`filters[title][$containsi][0]`]: value,
    'populate': '*'
  }
});

export const classificationDeleteReq = (id) => request(`/api/classifications/${id}`, {
  method: 'DELETE'
})
