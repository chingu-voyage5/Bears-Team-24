/* eslint-disable */
import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import renderer from 'react-test-renderer';

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
  const expectedElements = (
    <BrowserRouter>
      <React.Fragment>
        <Collapsible key="Voyage" title="Voyage" open={true}>
          <Collapsible
            key="About this wiki"
            title="About this wiki"
            open={true}
          >
            <Link key="Home" to={'/cms/1'}>
              Home
            </Link>
            <Link key="How to Contribute" to={'/cms/2'}>
              How to Contribute
            </Link>
          </Collapsible>
          <Collapsible key="About Voyages" title="About Voyages" open={false}>
            <Link key="About Voyages" to={'/cms/3'}>
              About Voyages
            </Link>
          </Collapsible>
        </Collapsible>
      </React.Fragment>
    </BrowserRouter>
  );

  it('should create article tree', () => {
    tree = getTree(articles);
    expect(tree).toEqual(expectedTree);
  });
  it('should create elements', () => {
    const path = ['Voyage', 'Acout this wiki', 'Home', '1'];
    const elements = getChildren(tree, path);

    // expect(elements).toEqual(expectedElements);

    const d = renderer
      .create(
        <BrowserRouter>
          <React.Fragment>{elements}</React.Fragment>
        </BrowserRouter>
      )
      .toJSON();
    // expect(d).toEqual(expectedElements);
    expect(d).toMatchSnapshot();
    expect(expectedElements).toMatchSnapshot();
  });
});
