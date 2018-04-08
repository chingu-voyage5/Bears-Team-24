import handleResponse from '../common/ErrorHandler';

const get = id =>
  fetch(`/api/v0/articles/${id}`, {
    method: 'get',
    headers: { accept: 'application/json', 'content-type': 'application/json' },
    credentials: 'same-origin',
  }).then(handleResponse);

const save = payload =>
  fetch('/api/v0/articles', {
    method: 'post',
    headers: { accept: 'application/json', 'content-type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify(payload),
  }).then(handleResponse);

export default { get, save };
