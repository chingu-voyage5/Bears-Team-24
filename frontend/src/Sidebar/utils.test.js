import buildHtml, { getTree } from './utils';

const topics = [{ _id: '1', name: 'Voyage', order: 1 }];
// eslint-disable-next-line camelcase
const sub_topics = [
  { _id: '10', parent: '1', name: 'About this Wiki', order: 1 },
  { _id: '11', parent: '1', name: 'About Voyages', order: 2 },
];

/* eslint-disable prettier/prettier */
const articles = [
  {
    _id: '100',
    topic: topics[0],
    sub_topic: sub_topics[0],
    title: 'Home',
    order: 1,
  },
  {
    _id: '101',
    topic: topics[0],
    sub_topic: sub_topics[0],
    title: 'How to Contribute',
    order: 2,
  },
  {
    _id: '102',
    topic: topics[0],
    sub_topic: sub_topics[1],
    title: 'Voyage Roadmap',
    order: 1,
  },
  {
    _id: '103',
    topic: topics[0],
    sub_topic: null,
    title: 'Introduction',
    order: 1,
  },
];
const expectedTree = {
  Voyage: {
    _id: '1',
    expanded: false,
    'About this Wiki': {
      _id: '10',
      expanded: false,
      Home: '100',
      'How to Contribute': '101',
    },
    'About Voyages': {
      _id: '11',
      expanded: false,
      'Voyage Roadmap': '102',
    },
    Introduction: '103',
  },
};

it('should create article tree', () => {
  const articleTree = getTree(articles);
  expect(articleTree).toEqual(expectedTree);
});

const onArticleSelect = () => {};
const onExpand = () => {};

it('should create html tree from articles', () => {
  const articleTree = getTree(articles);
  const html = buildHtml(articles, articleTree, '', onArticleSelect, onExpand);
  expect(html).toMatchSnapshot();
});

it('should create expanded tree if id present', () => {
  const articleTree = getTree(articles);
  const html = buildHtml(articles, articleTree, '101', onArticleSelect, onExpand);
  expect(html).toMatchSnapshot();
});
