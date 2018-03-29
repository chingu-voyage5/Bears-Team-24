const get = id =>
  fetch(`/api/v0/articles/${id}`, {
    method: 'get',
    headers: { accept: 'application/json', 'content-type': 'application/json' },
    credentials: 'same-origin',
  }).then(res => res.json());

export default { get };
