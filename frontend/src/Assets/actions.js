import handleResponse from '../common/ErrorHandler';

let getAll;

if (process.env.REACT_APP_ALONE) {
  /* eslint-disable */
  const assets = require('../_mockData/assets.json');
  /* eslint-enable */

  getAll = () => new Promise(resolve => resolve(assets));
} else {
  getAll = () =>
    fetch('/api/v1/assets', {
      method: 'get',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
    }).then(handleResponse);
}

export default { getAll };
