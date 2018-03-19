
const getUser = () => fetch('/api/v1/user', {
  method: 'get',
  headers: { 'content-type': 'application/json' },
  credentials: 'same-origin'
}).then(res => {
  if (res.ok) {
    return Promise.resolve(res.json());
  }
  return Promise.reject(res);
});

const logout = () => fetch('/api/v1/logout', {
  method: 'post',
  headers: { 'content-type': 'application/json' },
  credentials: 'same-origin',
}).then(res => res.json());

export default { getUser, logout };
