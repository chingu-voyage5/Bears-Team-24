import handleResponse from '../common/ErrorHandler';

let getUser;
let getUserList;

if (process.env.REACT_APP_ALONE) {
  /* eslint-disable */
  const users = require('../_mockData/users.json');
  const user = require('../_mockData/user.json');
  const avatar = require('../_mockData/avatar.png');
  /* eslint-enable */

  user.avatar = avatar;

  getUserList = () => new Promise(resolve => resolve(users));

  getUser = () => new Promise(resolve => resolve({ user }));
} else {
  getUserList = () =>
    fetch('/api/v1/users', {
      method: 'get',
      headers: { 'content-type': 'application/json' },
      credentials: 'same-origin',
    }).then(handleResponse);

  getUser = userId =>
    fetch(`/api/v1/user/${userId}`, {
      method: 'get',
      headers: { 'content-type': 'application/json' },
      credentials: 'same-origin',
    }).then(handleResponse);
}

export default { getUser, getUserList };
