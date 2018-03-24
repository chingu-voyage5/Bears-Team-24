const register = payload =>
  fetch('/api/v1/register', {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  }).then(res => res.json());

const login = payload =>
  fetch('/api/v1/login', {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify(payload),
  }).then(res => res.json());

export default { register, login };
