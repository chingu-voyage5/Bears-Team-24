import handleResponse from '../common/ErrorHandler';

const getAll = () =>
  fetch('/api/v0/articles', {
    method: 'get',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    credentials: 'same-origin',
  }).then(handleResponse);

const getArticleChangeRequestList = () =>
  fetch('/api/v0/articleChangeRequestList', {
    method: 'get',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    credentials: 'same-origin',
  }).then(handleResponse);

export default { getAll, getArticleChangeRequestList };
