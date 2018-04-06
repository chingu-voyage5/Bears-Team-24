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

const DEFAULT_DISPLAY_SUBTOPIC = 'Uncategorized Articles';

const buildPathTable = articles => {
  // with pathtable i can find id of article at specific path
  const arr = JSON.parse(articles);

  const obj = {};
  const uniqueCounter = {};

  for (let i = 0; i < arr.length; i += 1) {
    const c = arr[i]; // current element
    if (c.title) {
      const path = `${c.topic}|${c.sub_topic || DEFAULT_DISPLAY_SUBTOPIC}|${
        c.title
      }`;
      const key = slug(path);
      let finalPath = key;
      if (!obj[key]) {
        uniqueCounter[key] = 1;
      } else {
        finalPath += `-${uniqueCounter[key]}`;
        uniqueCounter[key] += 1;
      }
      obj[finalPath] = c._id;
    }
  }

  return obj;
};

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

const buildTopicTree = articles => {
  const arr = JSON.parse(articles);
  const tree = {};
  const uniqueCounter = {};
  for (let i = 0; i < arr.length; i += 1) {
    const c = arr[i];
    const slugTopic = slug(c.topic);
    if (!tree[slugTopic]) {
      tree[slugTopic] = { titleDisplay: c.topic };
    }
    const slugSubtopic = slug(c.sub_topic || DEFAULT_DISPLAY_SUBTOPIC);
    if (!tree[slugTopic][slugSubtopic]) {
      tree[slugTopic][slugSubtopic] = {
        titleDisplay: c.sub_topic || DEFAULT_DISPLAY_SUBTOPIC,
      };
    }
    const slugTitle = slug(c.title);
    const uniqueKey = `${slugTopic}|${slugSubtopic}|${slugTitle}`;
    if (!tree[slugTopic][slugSubtopic][slugTitle]) {
      tree[slugTopic][slugSubtopic][slugTitle] = { titleDisplay: c.title };
      uniqueCounter[`${slugTopic}|${slugSubtopic}|${slugTitle}`] = 1;
    } else {
      tree[slugTopic][slugSubtopic][
        `${slugTitle}-${uniqueCounter[uniqueKey]}`
      ] = { titleDisplay: c.title };
      uniqueCounter[uniqueKey] += 1;
    }
  }

  return tree;
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
    .catch(err=> {
    	console.log(err);
    	return false;
    });
  
}

export default { getUser, logout, checkLocalStorage };
