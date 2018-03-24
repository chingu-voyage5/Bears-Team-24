const save = payload =>
  fetch('/api/v1/asset', {
    method: 'post',
    credentials: 'same-origin',
    body: payload,
  }).then(res => res.json);

export default { save };
