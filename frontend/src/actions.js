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

const slug = fullPath =>
  fullPath
    .toLowerCase()
    .replace(/[^A-Za-z0-9-| ]/g, '')
    .replace(/\s/g, '-');

const buildPathTable = articles => {
  // with pathtable i can find id of article at specific path
  const arr = JSON.parse(articles);
  const obj = {};
  for (let i = 0; i < arr.length; i += 1) {
    const c = arr[i]; // current element
    const path = `${c.topic}|${c.sub_topic}|${c.title}`;
    obj[slug(path)] = c._id;
  }
  return obj;
};

const buildArticleNumbers = articles => {
  // with this table i can quickly find element in allArticles if i know id
  const arr = JSON.parse(articles);
  const obj = {};
  for (let i = 0; i < arr.length; i += 1) {
    const c = arr[i]; // current element
    obj[c._id] = i;
  }
  return obj;
};

const buildTopicTree = articles => {
  const arr = JSON.parse(articles);
  const tree = {};
	console.log(arr);
  for (let i = 0; i < arr.length; i += 1) {
    const c = arr[i];
    const slugTopic = slug(c.topic);
    if (!tree[slugTopic]) {
      tree[slugTopic] = { titleDisplay: c.topic };
    }
    const slugSubtopic = slug(c.sub_topic);
    if (!tree[slugTopic][c.slugSubtopic]) {
      tree[slugTopic][slugSubtopic] = { titleDisplay: c.sub_topic };
    }
    const slugTitle = slug(c.title);
    if (!tree[slugTopic][slugSubtopic][slugTitle]) {
      tree[slugTopic][slugSubtopic][slugTitle] = { titleDisplay: c.title };
    }
  }

  return tree;
};

function checkLocalStorage () {
  // production version :
  // if (!localStorage.getItem('allArticles'))

  // development version:
  if (true) {
    console.log('request articles from backend');
    console.time('load-cms');
    fetch('/api/v1/articles/')
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('allArticles', JSON.stringify(data));
        console.log('articles data received');
        console.timeEnd('load-cms');
        const articles = localStorage.getItem('allArticles');
        const pathTable = buildPathTable(articles);
        localStorage.setItem('pathTable', JSON.stringify(pathTable));
        const articleIndex = buildArticleNumbers(articles);
        localStorage.setItem('articleIndex', JSON.stringify(articleIndex));
        const tree = buildTopicTree(articles);
        localStorage.setItem('tree', JSON.stringify(tree));
			// this == <App />     
        	this.setState({cmsReady: true});
        
        }
    );
  }
}

export default { getUser, logout, checkLocalStorage };
