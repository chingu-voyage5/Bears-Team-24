import React from 'react';

import findLeafPath from './findLeafPath';

import Collapsible from './Collapsible';

import { LI, DrawerLink } from './styled';

export const BREAK_MOBILE = 900;

export const checkMobile = (
  mobile,
  windowWidth,
  breakMobile = BREAK_MOBILE
) => {
  if (
    (mobile && windowWidth > breakMobile) ||
    (!mobile && windowWidth <= breakMobile)
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

export const getChildren = ({
  articleTree,
  activePath,
  onArticleSelect,
  onExpand,
}) => {
  const keys = Object.keys(articleTree);

  return keys.reduce((acc, key) => {
    if (key === '_id' || key === 'expanded') return acc;

    const s = articleTree[key];

    if (typeof s === 'string') {
      return acc.concat(
        <LI key={s} onClick={onArticleSelect}>
          <DrawerLink to={`/cms/${s}`}>{`${key}`}</DrawerLink>
        </LI>
      );
    }

    const children = getChildren({
      articleTree: articleTree[key],
      activePath,
      onArticleSelect,
      onExpand,
    });

    const open =
      articleTree[key].expanded || activePath.includes(articleTree[key]._id);

    return acc.concat(
      <Collapsible
        key={articleTree[key]._id}
        title={key}
        id={articleTree[key]._id}
        open={open}
        expanded={onExpand}
      >
        {children}
      </Collapsible>
    );
  }, []);
};

const buildHtml = ({ articles, id, articleTree, ...rest }) => {
  const activePath = id ? findLeafPath(articleTree, id) : [];

  const articlesHtml = getChildren({ articleTree, activePath, ...rest });

  return articlesHtml;
};

export default buildHtml;
