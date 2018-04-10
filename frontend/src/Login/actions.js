import handleResponse from '../common/ErrorHandler';

const register = payload =>
  fetch('/api/v1/register', {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  }).then(handleResponse);

const login = payload =>
  fetch('/api/v1/login', {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify(payload),
  }).then(handleResponse);

export default { register, login };
