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
  return fetch('/api/v1/articles/')
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('allArticles', JSON.stringify(data));
      const articles = localStorage.getItem('allArticles');
      const articleIndex = buildArticleNumbers(articles);
      localStorage.setItem('articleIndex', JSON.stringify(articleIndex));
      return true;
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.error('checkLocalStorage fetch articles failed', err);
      return false;
    });
}

function getArticlesJSONBypass() {
  return fetch('/api/v1/articles/')
    .then(res => res.json())
    .then(data => data)
    .catch(err => {
      // eslint-disable-next-line no-console
      console.error('checkLocalStorage fetch articles failed', err);
      return false;
    });
}

const getArticleList = () => fetch('/api/v0/articles').then(res => res.json());

export default { getArticleList, checkLocalStorage, getArticlesJSONBypass };
