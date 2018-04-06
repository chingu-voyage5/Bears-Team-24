import React from 'react';
import { getTree, getChildren } from './utils';
import { Wrapper } from './styled';

const Sidebar = () => {
  
  const articles = JSON.parse(localStorage.getItem('allArticles'));
  const tree = getTree(articles);
  const tre = getChildren(tree);
  return <Wrapper>{tre}</Wrapper>;
};

export default Sidebar;
