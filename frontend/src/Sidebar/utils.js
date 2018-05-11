import React from 'react';

import Collapsible from './Collapsible';

import { LI, DrawerLink } from './styled';

export const checkMobile = (mobile, windowWidth) => {
  const BREAK_MOBILE = 900;

  if (
    (mobile && windowWidth > BREAK_MOBILE) ||
    (!mobile && windowWidth <= BREAK_MOBILE)
  ) {
    return !mobile;
  }

  return mobile;
};

/* eslint-disable spaced-comment */
/******************************************************************************

{
  HELP : {
    About this CMS : {
      About this CMS: "5ae27568463f344afc3ac09f"
    }
  }
  How to ... : {
    Create a New Article: "5ae27568463f344afc3ac0a0",
    Edit an Article: "5ae27568463f344afc3ac0a1"
  }
  Introduction : "5ae27568463f344afc3ac09e"
}

new tree structure
we need expanded flag and _id for topic/sub-topics, but not article leaf nodes

{
  HELP : {
    _id: string
    expanded: [true|false]
    About this CMS : {
      _id: string
      expanded: [true|false]
      About this CMS: "5ae27568463f344afc3ac09f"
    }
    How to ... : {
      _id: string
      expanded: [true|false]
      Create a New Article: "5ae27568463f344afc3ac0a0",
      Edit an Article: "5ae27568463f344afc3ac0a1"
    }
    Introduction : "5ae27568463f344afc3ac09e"
  }
  next-topic: {}
}

******************************************************************************/

export const getTree = articles => {
  const tree = {};
  articles.forEach(article => {
    if (!tree[article.topic.name]) {
      tree[article.topic.name] = {
        _id: article.topic._id,
        expanded: false,
      };
    }
    let topic = tree[article.topic.name];
    if (article.sub_topic) {
      const list = article.sub_topic.name.split('>');
      list.forEach(sub => {
        if (!topic[sub]) {
          topic[sub] = {
            _id: article.sub_topic._id,
            expanded: false,
          };
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
export const getChildren = (sub, path, onArticleSelect, onExpand) => {
  const keys = Object.keys(sub);
  return keys.reduce((acc, key) => {
    if (key === '_id' || key === 'expanded') return acc;
    const s = sub[key];
    if (typeof s === 'string') {
      // TODO: great idea but keeping it updated will be fun
      // const displayed = path.includes(key) ? ' >' : '';
      return acc.concat(
        <LI key={ndx++} onClick={onArticleSelect}>
          <DrawerLink to={`/cms/${s}`}>{`${key}`}</DrawerLink>
        </LI>
      );
    }
    const children = getChildren(sub[key], path, onArticleSelect, onExpand);

    const open = sub[key].expanded || path.includes(key);
    return acc.concat(
      <Collapsible
        key={ndx++}
        title={key}
        id={sub[key]._id}
        open={open}
        expanded={onExpand}
      >
        {children}
      </Collapsible>
    );
  }, []);
};
/* eslint-enable no-plusplus */

const buildHtml = (articles, articleTree, id, onArticleSelect, onExpand) => {
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
  const articlesHtml = getChildren(
    articleTree,
    selectedArticlePath,
    onArticleSelect,
    onExpand
  );
  return articlesHtml;
};

export default buildHtml;
