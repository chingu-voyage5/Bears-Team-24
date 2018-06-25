import handleResponse from '../common/ErrorHandler';

const getUserList = () =>
  fetch('/api/v1/users', {
    method: 'get',
    headers: { 'content-type': 'application/json' },
    credentials: 'same-origin',
  }).then(handleResponse);

const getUser = userId =>
  fetch(`/api/v1/user/${userId}`, {
    method: 'get',
    headers: { 'content-type': 'application/json' },
    credentials: 'same-origin',
  }).then(handleResponse);

const saveUser = payload =>
  fetch('/api/v1/user', {
    method: 'put',
    headers: { 'content-type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify(payload),
  }).then(handleResponse);

export default { getUser, getUserList, saveUser };
