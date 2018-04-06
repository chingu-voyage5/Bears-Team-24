import React from 'react';
import { Link } from 'react-router-dom';

import Collapsible from './Collapsible';
import { LI } from './styled';

const getTree = articles => {
  const tree = {};
  articles.forEach(article => {
    if (!tree[article.topic]) {
      tree[article.topic] = {};
    }
    let topic = tree[article.topic];
    if (article.sub_topic) {
      const list = article.sub_topic.split('>');
      list.forEach(sub => {
        if (!topic[sub]) {
          topic[sub] = {};
        }
        topic = topic[sub];
      });
    }
    // topic.article = { title: article.title, _id : article._id };
    topic[article.title] = article._id;
  });
  return tree;
};

let ndx = 0;
/* eslint-disable no-plusplus */
const getChildren = sub => {
  const keys = Object.keys(sub);
  return keys.map(key => {
    const s = sub[key];
    if (typeof s === 'string') {
      return (
        <LI key={ndx++}>
          <Link to={`/cms/${s}`}>{key}</Link>
        </LI>
      );
    }
    const children = getChildren(sub[key]);
    return (
      <Collapsible key={ndx++} title={key}>
        {children}
      </Collapsible>
    );
  });
};
/* eslint-enable no-plusplus */

export { getTree, getChildren };
