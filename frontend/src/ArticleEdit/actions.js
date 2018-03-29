const get = id =>
  fetch(`/api/v1/articles/${id}`, {
    method: 'get',
    headers: { accept: 'application/json', 'content-type': 'application/json' },
    credentials: 'same-origin',
  }).then(res => res.json());

export default { get };
