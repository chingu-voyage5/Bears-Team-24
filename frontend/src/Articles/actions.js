let getAll;

if (process.env.REACT_APP_ALONE) {
  /* eslint-disable */
  const articles = require('../_mockData/articles.json');
  /* eslint-enable */

  getAll = () => new Promise(resolve => resolve(articles));
} else {
  getAll = () =>
    fetch('/api/v0/articles', {
      method: 'get',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
    }).then(res => res.json());
}

export default { getAll };
