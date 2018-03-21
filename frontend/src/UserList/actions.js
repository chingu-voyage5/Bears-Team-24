const getUserList = () =>
  fetch('/api/v1/users', {
    method: 'get',
    headers: { 'content-type': 'application/json' },
    credentials: 'same-origin',
  }).then(res => res.json());

const getUser = userId =>
  fetch(`/api/v1/user/${userId}`, {
    method: 'get',
    headers: { 'content-type': 'application/json' },
    credentials: 'same-origin',
  }).then(res => res.json());

export default { getUser, getUserList };
