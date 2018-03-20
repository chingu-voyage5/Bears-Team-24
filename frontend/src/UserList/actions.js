const getUserList = () =>
  fetch('/api/v1/users', {
    method: 'get',
    headers: { 'content-type': 'application/json' },
    credentials: 'same-origin',
  }).then(res => res.json());

const getUser = payload =>
  fetch('/api/v1/user', {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify(payload),
  }).then(res => res.json());

export default { getUser, getUserList };
