const getAll = () =>
  fetch('/api/v1/assets', {
    method: 'get',
    headers: { 'content-type': 'application/json' },
    credientials: 'same-origin',
  }).then(res => res.json());

export default { getAll };
