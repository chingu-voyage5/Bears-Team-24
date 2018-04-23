/* eslint-disable */
import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import renderer from 'react-test-renderer';

import Collapsible from './Collapsible';

import { getTree, getChildren } from './utils';

describe('creating tree', () => {
  let tree;
  const topics = [
    { _id: '1', name: 'Voyage', order: 1 }
  ];
  const sub_topics = [
    { _id: '1', parent: '0', name: 'About this wiki', order: 1 },
    { _id: '2', parent: '0', name: 'About Voyages', order: 2 },
  ];
  const articles = [
    { _id: '1', topic: topics[0], sub_topic: sub_topics[0], title: 'Home', order: 1 },
    {
      _id: '2',
      topic: topics[0],
      sub_topic: sub_topics[0],
      title: 'How to Contribute',
      order: 2,
    },
    {
      _id: '3',
      topic: topics[0],
      sub_topic: sub_topics[1],
      title: 'About Voyages',
      order: 1,
    },
  ];
  const expectedTree = {
    Voyage: {
      'About this wiki': { Home: '1', 'How to Contribute': '2' },
      'About Voyages': { 'About Voyages': '3' },
    },
  };

  it('should create article tree', () => {
    tree = getTree(articles);
    expect(tree).toEqual(expectedTree);
  });

  it('should create elements', () => {
    const path = ['Voyage', 'About this wiki', 'Home'];
    const elements = getChildren(tree, path);

    // expect(elements).toEqual(expectedElements);

    const d = renderer
      .create(
        <BrowserRouter>
          <React.Fragment>{elements}</React.Fragment>
        </BrowserRouter>
      )
      .toJSON();

    expect(d).toMatchSnapshot();
  });
});

  // const expectedElements = (
  //   <BrowserRouter>
  //     <React.Fragment>
  //       <Collapsible key="Voyage" title="Voyage" open={true}>
  //         <Collapsible
  //           key="About this wiki"
  //           title="About this wiki"
  //           open={true}
  //         >
  //           <Link key="Home" to={'/cms/1'}>
  //             Home
  //           </Link>
  //           <Link key="How to Contribute" to={'/cms/2'}>
  //             How to Contribute
  //           </Link>
  //         </Collapsible>
  //         <Collapsible key="About Voyages" title="About Voyages" open={false}>
  //           <Link key="About Voyages" to={'/cms/3'}>
  //             About Voyages
  //           </Link>
  //         </Collapsible>
  //       </Collapsible>
  //     </React.Fragment>
  //   </BrowserRouter>
  // );
