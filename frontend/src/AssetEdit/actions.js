import handleResponse from '../common/ErrorHandler';

import { getLocalUrl } from './utils';

const save = payload =>
  fetch('/api/v1/asset', {
    method: 'post',
    credentials: 'same-origin',
    body: payload,
  }).then(handleResponse);

const get = id => fetch(`/api/v1/asset/${id}`).then(handleResponse);

const getContent = id =>
  fetch(`/api/v1/asset/content/${id}`)
    .then(handleResponse)
    .then(getLocalUrl);

export default { save, get, getContent };
