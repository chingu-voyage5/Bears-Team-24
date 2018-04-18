const getArticle = id =>
  fetch(`/api/v0/articles/${id}`).then(res => res.json());

// eslint-disable-next-line import/prefer-default-export
export { getArticle };
