/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';

import Collapsible from './Collapsible';

import { getTree, getChildren } from './utils';

describe('creating tree', () => {
  let tree;
  const articles = [
    { _id: '1', topic: 'Voyage', sub_topic: 'About this wiki', title: 'Home' },
    {
      _id: '2',
      topic: 'Voyage',
      sub_topic: 'About this wiki',
      title: 'How to Contribute',
    },
    {
      _id: '3',
      topic: 'Voyage',
      sub_topic: 'About Voyages',
      title: 'About Voyages',
    },
  ];
  const expectedTree = {
    Voyage: {
      'About this wiki': { Home: '1', 'How to Contribute': '2' },
      'About Voyages': { 'About Voyages': '3' },
    },
  };
  const expectedElements = [
    <Collapsible key="Voyage" title="Voyage">
      <Collapsible key="About this wiki" title="About this wiki">
        <Link key="Home" to={'/cms/1'}>
          Home
        </Link>
        <Link key="How to Contribute" to={'/cms/2'}>
          How to Contribute
        </Link>
      </Collapsible>
      <Collapsible key="About Voyages" title="About Voyages">
        <Link key="About Voyages" to={'/cms/3'}>
          About Voyages
        </Link>
      </Collapsible>
    </Collapsible>,
  ];
  it('should create article tree', () => {
    tree = getTree(articles);
    expect(tree).toEqual(expectedTree);
  });
  it('should create elements', () => {
    const elements = getChildren(tree);
    expect(elements).toEqual(expectedElements);
  });
});
