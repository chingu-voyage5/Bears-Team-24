import handleResponse from '../common/ErrorHandler';

let get;
let save;

if (process.env.REACT_APP_ALONE) {
  /* eslint-disable */
  const article = require('../_mockData/article.json');
  /* eslint-enable */

  get = () => new Promise(resolve => resolve(article));

  save = payload => new Promise(resolve => resolve(payload));
} else {
  get = id =>
    fetch(`/api/v0/articles/${id}`, {
      method: 'get',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
    }).then(handleResponse);

  save = payload =>
    fetch('/api/v0/articles', {
      method: 'post',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(payload),
    }).then(handleResponse);
}

export default { get, save };
