import React from 'react';

import Collapsible from './Collapsible';
import { LI, DrawerLink } from './styled';

export const getTree = articles => {
  const tree = {};
  articles.forEach(article => {
    if (!tree[article.topic.name]) {
      tree[article.topic.name] = {};
    }
    let topic = tree[article.topic.name];
    if (article.sub_topic) {
      const list = article.sub_topic.name.split('>');
      list.forEach(sub => {
        if (!topic[sub]) {
          topic[sub] = {};
        }
        topic = topic[sub];
      });
    }
    topic[article.title] = article._id;
  });
  return tree;
};

let ndx = 0;
/* eslint-disable no-plusplus */
export const getChildren = (sub, path, onArticleSelect) => {
  const keys = Object.keys(sub);
  return keys.map(key => {
    const s = sub[key];
    if (typeof s === 'string') {
      // TODO: great idea but keeping it updated will be fun
      // const displayed = path.includes(key) ? ' >' : '';
      return (
        <LI key={ndx++} onClick={onArticleSelect}>
          <DrawerLink to={`/cms/${s}`}>{`${key}`}</DrawerLink>
        </LI>
      );
    }
    const children = getChildren(sub[key], path, onArticleSelect);
    const open = path.includes(key);
    return (
      <Collapsible key={ndx++} title={key} open={open}>
        {children}
      </Collapsible>
    );
  });
};
/* eslint-enable no-plusplus */

const buildTree = (articles, id, onArticleSelect) => {
  let selectedArticlePath = [];
  if (id) {
    const selectedArticles = articles.filter(article => article._id === id);
    if (selectedArticles.length) {
      /* eslint-disable camelcase */
      const { topic, sub_topic, title } = selectedArticles[0];
      selectedArticlePath = [topic.name, title];
      if (sub_topic) {
        selectedArticlePath = selectedArticlePath.concat(
          sub_topic.name.split('>')
        );
      }
      /* eslint-enalbe camelcase */
    }
  }
  const tree = getTree(articles);
  const articlesHtml = getChildren(tree, selectedArticlePath, onArticleSelect);
  return articlesHtml;
};

export default buildTree;
