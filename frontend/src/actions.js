import handleResponse from './common/ErrorHandler';

const getUser = () =>
  fetch('/api/v1/user', {
    method: 'get',
    headers: { 'content-type': 'application/json' },
    credentials: 'same-origin',
  }).then(handleResponse);

const logout = () =>
  fetch('/api/v1/logout', {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    credentials: 'same-origin',
  }).then(handleResponse);

export default { getUser, logout };
