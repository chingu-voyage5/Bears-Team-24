let getUser;
let getUserList;

if (process.env.REACT_APP_ALONE) {
  /* eslint-disable */
  const users = require('../_mockData/users.json');
  const user = require('../_mockData/user.json');
  const avatar = require('../_mockData/avatar.png');
  /* eslint-enable */

  user.avatar = avatar;

  getUserList = () => users;

  getUser = () => new Promise(resolve => resolve({ user }));
} else {
  getUserList = () =>
    fetch('/api/v1/users', {
      method: 'get',
      headers: { 'content-type': 'application/json' },
      credentials: 'same-origin',
    })
      .then(res => res.json())
      // eslint-disable-next-line
      .catch(err => console.log(err));

  getUser = userId =>
    fetch(`/api/v1/user/${userId}`, {
      method: 'get',
      headers: { 'content-type': 'application/json' },
      credentials: 'same-origin',
    })
      .then(res => res.json())
      // eslint-disable-next-line
      .catch(err => console.log(err));
}

export default { getUser, getUserList };
