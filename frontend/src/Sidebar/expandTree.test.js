import expandTree from './expandTree';

const testTree1 = {
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

const expectedTree1 = {
  Voyage: {
    _id: '1',
    expanded: true,
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
const expectedTree2 = {
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
      expanded: true,
      'Voyage Roadmap': '102',
    },
    Introduction: '103',
  },
};

it('should set expanded', () => {
  const tree = expandTree(testTree1, '1', true);
  expect(tree).toEqual(expectedTree1);
});
it('should collapse correctly', () => {
  const start = expandTree(testTree1, '1', true);
  const end = expandTree(start, '1', false);
  expect(end).toEqual(testTree1);
});
it('should set correct child expanded', () => {
  const tree = expandTree(testTree1, '11', true);
  expect(tree).toEqual(expectedTree2);
});

const testTree10 = {
  Voyage: {
    _id: '1',
    expanded: true,
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

const expectedTree10 = {
  Voyage: {
    _id: '1',
    expanded: true,
    'About this Wiki': {
      _id: '10',
      expanded: true,
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

it('should expand without destroying current expansions', () => {
  const tree = expandTree(testTree10, '10', true);
  expect(tree).toEqual(expectedTree10);
});
it('should collapse without distroying existing tree', () => {
  const start = expandTree(testTree10, '10', true);
  const end = expandTree(start, '10', false);
  expect(end).toEqual(testTree10);
});
