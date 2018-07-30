import findLeafPath from './findLeafPath';

// const fs = require('fs');
//
// const readJson = path => {
//   const contents = fs.readFileSync(path);
//   return JSON.parse(contents);
// };
//
// const tree = readJson('src/playground/topicTree.json');
// this is the article/topic tree json at time of writing
/* eslint-disable */
const tree = {
  Voyage: {
    _id: '5b1983cfbb796d2be9f7cf02',
    expanded: false,
    'About this wiki': {
      _id: '5b1983cfbb796d2be9f7cf03',
      expanded: false,
      Home: '5b1983cfbb796d2be9f7cf0a',
      'How to Contribute': '5b1983cfbb796d2be9f7cf0b',
    },
    'About Voyages': {
      _id: '5b1983cfbb796d2be9f7cf04',
      expanded: false,
      'About Voyages': '5b1983cfbb796d2be9f7cf0c',
      'Voyage Roadmap': '5b1983cfbb796d2be9f7cf0d',
      '.. Tier1 Schedule': '5b1983cfbb796d2be9f7cf0e',
      '.. Tier2 & 3 Schedule': '5b1983cfbb796d2be9f7cf0f',
      'Voyage Support': '5b1983cfbb796d2be9f7cf10',
      'What Team Am I On?': '5b1983cfbb796d2be9f7cf11',
    },
    'Project Setup': {
      _id: '5b1983cfbb796d2be9f7cf05',
      expanded: false,
      'Understanding Your Obligations': '5b1983cfbb796d2be9f7cf12',
      'Establishing the Team': '5b1983cfbb796d2be9f7cf13',
      'Setting Up Your Git Workflow': '5b1983cfbb796d2be9f7cf14',
      'Defining Your Project': '5b1983cfbb796d2be9f7cf15',
    },
    'Development Sprints': {
      _id: '5b1983cfbb796d2be9f7cf06',
      expanded: false,
      'Creating a Readme': '5b1983cfbb796d2be9f7cf16',
      'Pair Programming': '5b1983cfbb796d2be9f7cf17',
      'Tracking Issues': '5b1983cfbb796d2be9f7cf18',
    },
    'Project Closure': {
      _id: '5b1983cfbb796d2be9f7cf07',
      expanded: false,
      TBD: '5b1983cfbb796d2be9f7cf19',
    },
    'Tools and Resources': {
      _id: '5b1983cfbb796d2be9f7cf08',
      expanded: false,
      'Useful Links': '5b1983cfbb796d2be9f7cf1a',
      FAQ: {
        _id: '5b1983cfbb796d2be9f7cf09',
        expanded: false,
        'Voyage wiki': '5b1983cfbb796d2be9f7cf1b',
        Voyage: '5b1983cfbb796d2be9f7cf1c',
        'Your Team': '5b1983cfbb796d2be9f7cf1d',
        'Git & GitHub': '5b1983cfbb796d2be9f7cf1e',
        Slack: '5b1983cfbb796d2be9f7cf1f',
        'Project Licence': '5b1983cfbb796d2be9f7cf20',
        Glossary: '5b1983cfbb796d2be9f7cf21',
      },
    },
  },
  PMRoK: {
    _id: '5b1983cfbb796d2be9f7cf22',
    expanded: false,
    'About this wiki': {
      _id: '5b1983cfbb796d2be9f7cf23',
      expanded: false,
      'The Chingu PMRoK': '5b1983cfbb796d2be9f7cf2a',
      'How to Contribute': '5b1983cfbb796d2be9f7cf2b',
    },
    'About Voyages': {
      _id: '5b1983cfbb796d2be9f7cf24',
      expanded: false,
      'Voyage Roadmap': '5b1983cfbb796d2be9f7cf2c',
      'Voyage Workflow': '5b1983cfbb796d2be9f7cf2d',
    },
    'Managing a Project': {
      _id: '5b1983cfbb796d2be9f7cf25',
      expanded: false,
      'Project Manage Concepts': '5b1983cfbb796d2be9f7cf2e',
      'Your Sprints': '5b1983cfbb796d2be9f7cf2f',
      'Conducting an MVP': '5b1983cfbb796d2be9f7cf30',
      'Project Closure': '5b1983cfbb796d2be9f7cf31',
      'Using the Wizard': '5b1983cfbb796d2be9f7cf32',
    },
    Guidance: {
      _id: '5b1983cfbb796d2be9f7cf27',
      expanded: false,
      'Situational Guidance': {
        _id: '5b1983cfbb796d2be9f7cf26',
        expanded: false,
        'Building the Project Backlog': '5b1983cfbb796d2be9f7cf33',
        'Managing Application Secrets': '5b1983cfbb796d2be9f7cf34',
        'Managing Team Documentation': '5b1983cfbb796d2be9f7cf35',
        'Managing Issues & Requests': '5b1983cfbb796d2be9f7cf36',
        'Dealing with "Analysis Paralysis"': '5b1983cfbb796d2be9f7cf37',
      },
      'Managing Conflict': '5b1983cfbb796d2be9f7cf38',
    },
    Resources: {
      _id: '5b1983cfbb796d2be9f7cf28',
      expanded: false,
      'Tools & Resources': '5b1983cfbb796d2be9f7cf39',
      Glossary: '5b1983cfbb796d2be9f7cf3d',
      'PM FAQ': {
        _id: '5b1983cfbb796d2be9f7cf29',
        expanded: false,
        "I'm Nervous!": '5b1983cfbb796d2be9f7cf3a',
        'Your Team': '5b1983cfbb796d2be9f7cf3b',
        'Git & Github': '5b1983cfbb796d2be9f7cf3c',
      },
    },
  },
  HELP: {
    _id: '5b1983cfbb796d2be9f7cf3e',
    expanded: false,
    Introduction: '5b1983cfbb796d2be9f7cf41',
    'About this CMS': {
      _id: '5b1983cfbb796d2be9f7cf3f',
      expanded: false,
      'About this CMS': '5b1983cfbb796d2be9f7cf42',
    },
    'How to ...': {
      _id: '5b1983cfbb796d2be9f7cf40',
      expanded: false,
      'Create a New Article': '5b1983cfbb796d2be9f7cf43',
      'Edit an Article': '5b1983cfbb796d2be9f7cf44',
    },
  },
};
/* eslint-enable */

describe('find tree path for leaf', () => {
  it('should not find non-existant path', () => {
    const path = findLeafPath(tree, 'non-existant');
    expect(path).toBeNull();
  });
  it('should find path', () => {
    let path = findLeafPath(tree, '5b1983cfbb796d2be9f7cf0a');
    expect(path).toEqual([
      '5b1983cfbb796d2be9f7cf02',
      '5b1983cfbb796d2be9f7cf03',
    ]);

    path = findLeafPath(tree, '5b1983cfbb796d2be9f7cf0b');
    expect(path).toEqual([
      '5b1983cfbb796d2be9f7cf02',
      '5b1983cfbb796d2be9f7cf03',
    ]);

    path = findLeafPath(tree, '5b1983cfbb796d2be9f7cf20');
    expect(path).toEqual([
      '5b1983cfbb796d2be9f7cf02',
      '5b1983cfbb796d2be9f7cf08',
      '5b1983cfbb796d2be9f7cf09',
    ]);
    path = findLeafPath(tree, '5b1983cfbb796d2be9f7cf2d');
    expect(path).toEqual([
      '5b1983cfbb796d2be9f7cf22',
      '5b1983cfbb796d2be9f7cf24',
    ]);
    path = findLeafPath(tree, '5b1983cfbb796d2be9f7cf38');
    expect(path).toEqual([
      '5b1983cfbb796d2be9f7cf22',
      '5b1983cfbb796d2be9f7cf27',
    ]);
    path = findLeafPath(tree, '5b1983cfbb796d2be9f7cf37');
    expect(path).toEqual([
      '5b1983cfbb796d2be9f7cf22',
      '5b1983cfbb796d2be9f7cf27',
      '5b1983cfbb796d2be9f7cf26',
    ]);
  });
});
