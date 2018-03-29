const getAll = () =>
  fetch('/api/v1/articles', {
    method: 'get',
    headers: { accept: 'application/json', 'content-type': 'application/json' },
    credentials: 'same-origin',
  }).then(res => res.json());

export default { getAll };
