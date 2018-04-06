const getUser = () =>
  fetch('/api/v1/user', {
    method: 'get',
    headers: { 'content-type': 'application/json' },
    credentials: 'same-origin',
  }).then(res => {
    if (res.ok) {
      return Promise.resolve(res.json());
    }
    return Promise.reject(res);
  });

const logout = () =>
  fetch('/api/v1/logout', {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    credentials: 'same-origin',
  }).then(res => res.json());

const buildArticleNumbers = articles => {
  // with this table i can quickly find element in allArticles if i know id
  const arr = JSON.parse(articles);
  const obj = {};
  for (let i = 0; i < arr.length; i += 1) {
    const c = arr[i]; // current element
    obj[c._id] = i + 1;
  }

  return obj;
};


function checkLocalStorage() {
  // production version :
  // if(localStorage.getItem('allArticles')){
  //  console.log('local database found');
  //	return Promise.resolve(true);
  // }
  //
  // development version:
  console.log('request articles from backend');
  console.time('load-cms');
  return fetch('/api/v1/articles/')
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('allArticles', JSON.stringify(data));
      console.log('articles data received');
      console.timeEnd('load-cms');
      const articles = localStorage.getItem('allArticles');
      const articleIndex = buildArticleNumbers(articles);
      localStorage.setItem('articleIndex', JSON.stringify(articleIndex));
      return true;
    })
    .catch(err => {
      console.log(err);
      return false;
    });
}

export default { getUser, logout, checkLocalStorage };
