import handleResponse from '../common/ErrorHandler';

const getAll = () =>
  fetch('/api/v1/assets', {
    method: 'get',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    credentials: 'same-origin',
  }).then(handleResponse);

export default { getAll };
