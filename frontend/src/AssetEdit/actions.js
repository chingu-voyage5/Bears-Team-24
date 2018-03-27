import { getLocalUrl } from './utils';

const save = payload =>
  fetch('/api/v1/asset', {
    method: 'post',
    credentials: 'same-origin',
    body: payload,
  }).then(res => res.json());

const get = id => fetch(`/api/v1/asset/${id}`).then(res => res.json());

const getContent = id => fetch(`/api/v1/asset/content/${id}`).then(getLocalUrl);

export default { save, get, getContent };
