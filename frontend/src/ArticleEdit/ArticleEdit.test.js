import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import ArticleEdit from './ArticleEdit';
import actions from './actions';

import { topics, subTopics } from '../TopicEdit/__mocks__/topicData';
import mockArticle from './__mocks__/articleData';

jest.mock('./actions');
jest.mock('../TopicEdit/api');

let wrapper;

// we use this to prevent multiple return Promise constructs in
// should display error message if save rejected
function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

it('should set article topic and subtopic', () => {
  wrapper = shallow(<ArticleEdit empty />);
  wrapper.instance().setTopics(topics[0], subTopics[0]);
  expect(wrapper.instance().state.article).toEqual({
    title: '',
    order: 1,
    topic: topics[0],
    sub_topic: subTopics[0],
    content: '',
    edit_lock: false,
  });
});

it('should close message bar (material-ui/Snackbar)', () => {
  wrapper = shallow(<ArticleEdit empty />);
  wrapper
    .instance()
    .setState({ message: { show: true, error: false, text: 'Success' } });
  wrapper.instance().handleClose();
  expect(wrapper.instance().state.message).toEqual({
    show: false,
    error: false,
    text: 'Success',
  });
});

describe('ArticleEdit article updates', () => {
  const article = {
    title: 'test',
    order: 1,
    topic: topics[0],
    sub_topics: subTopics[0],
    content: 'test',
    edit_lock: false,
  };
  beforeEach(() => {
    const comp = shallow(<ArticleEdit empty />);
    wrapper = comp.instance();
    wrapper.setState({ article });
  });
  it('should update article title', () => {
    wrapper.handleFieldChange({
      target: { name: 'title', value: 'hello world' },
    });
    expect(wrapper.state.article.title).toBe('hello world');
  });
  it('should update article order', () => {
    wrapper.handleFieldChange({
      target: { name: 'order', value: '2' },
    });
    expect(wrapper.state.article.order).toBe('2');
  });
  it('should update article content', () => {
    wrapper.handleFieldChange({
      target: { name: 'content', value: 'hello chingu' },
    });
    expect(wrapper.state.article.content).toBe('hello chingu');
  });
});

describe('ArticleEdit validation', () => {
  beforeEach(() => {
    const comp = shallow(<ArticleEdit empty />);
    wrapper = comp.instance();
  });
  it('should be invalid if article has no title', () => {
    const res = wrapper.validateArticle({ title: '' });
    expect(res.success).toBeFalsy();
  });
  it('should be invalid if article has no topic', () => {
    const res = wrapper.validateArticle({ title: 'test' });
    expect(res.success).toBeFalsy();
  });
  it('should be invalid if article has no content', () => {
    const res = wrapper.validateArticle({ title: 'test', topic: topics[0] });
    expect(res.success).toBeFalsy();
  });
  it('should be valid if article has title, topic and content', () => {
    const res = wrapper.validateArticle({
      title: 'test',
      topic: topics[0],
      content: 'test',
    });
    expect(res.success).toBeTruthy();
  });
});

// uses TopicEdit mocks (and ArticleEdit)
it('should load article', () => {
  expect.hasAssertions();
  wrapper = shallow(<ArticleEdit id="43039ac8d0a244719d9d31e0731bcbe8" />);
  return flushPromises().then(() => {
    wrapper.update();
    const { article } = wrapper.instance().state;
    expect(article.title).toBe('About this wiki');
    expect(article.order).toBe(1);
    expect(article.topic).toEqual(topics[0]);
    expect(article.sub_topic).toEqual(subTopics[0]);
    expect(article.content).toBe('test content');
  });
});

it('should remove resize event listener on unmount', () => {
  jest
    .spyOn(ArticleEdit.prototype, 'loadData')
    .mockImplementation(
      () => new Promise(resolve => resolve([topics, subTopics]))
    );
  const adder = jest
    .spyOn(global, 'addEventListener')
    .mockImplementation(() => {});
  const remover = jest
    .spyOn(global, 'removeEventListener')
    .mockImplementation(() => {});
  wrapper = shallow(<ArticleEdit />);
  expect(adder).toHaveBeenCalled();
  return Promise.resolve().then(() => {
    wrapper.unmount();
    expect(remover).toHaveBeenCalled();
  });
});

it('should save article', () => {
  const article = { ...mockArticle, _id: null };
  jest
    .spyOn(ArticleEdit.prototype, 'loadData')
    .mockImplementation(
      () => new Promise(resolve => resolve([topics, subTopics, article]))
    );
  expect.hasAssertions();
  wrapper = shallow(<ArticleEdit />);
  return Promise.resolve().then(() => {
    wrapper.instance().handleSave();
    return Promise.resolve().then(() => {
      expect(wrapper.instance().state.article._id).toBe(
        '43039ac8d0a244719d9d31e0731bcbe8'
      );
    });
  });
});
it('should display message for invalid article before save', () => {
  jest
    .spyOn(ArticleEdit.prototype, 'loadData')
    .mockImplementation(
      () => new Promise(resolve => resolve([topics, subTopics]))
    );
  expect.hasAssertions();
  wrapper = shallow(<ArticleEdit />);
  return Promise.resolve().then(() => {
    wrapper.instance().handleSave();
    return Promise.resolve().then(() => {
      expect(wrapper.instance().state.message.show).toBeTruthy();
      expect(wrapper.instance().state.message.error).toBeTruthy();
      expect(wrapper.instance().state.message.text).toBe(
        'Please enter some content'
      );
    });
  });
});
it('should display error message if save fails', () => {
  const article = { ...mockArticle };
  jest.spyOn(actions, 'save').mockImplementation(
    () =>
      new Promise(resolve =>
        resolve({
          success: false,
          error: 'Not Authorised',
        })
      )
  );
  jest
    .spyOn(ArticleEdit.prototype, 'loadData')
    .mockImplementation(
      () => new Promise(resolve => resolve([topics, subTopics, article]))
    );
  expect.hasAssertions();
  wrapper = shallow(<ArticleEdit />);
  return Promise.resolve().then(() => {
    wrapper.instance().handleSave();
    return Promise.resolve().then(() => {
      expect(wrapper.instance().state.message.show).toBeTruthy();
      expect(wrapper.instance().state.message.error).toBeTruthy();
      expect(wrapper.instance().state.message.text).toBe('Not Authorised');
    });
  });
});

it('should display error message if save rejected', () => {
  const article = { ...mockArticle };
  jest
    .spyOn(actions, 'save')
    .mockImplementation(
      () =>
        new Promise((resolve, reject) =>
          reject(new Error('Internal Server Error'))
        )
    );
  jest
    .spyOn(ArticleEdit.prototype, 'loadData')
    .mockImplementation(
      () => new Promise(resolve => resolve([topics, subTopics, article]))
    );
  expect.hasAssertions();
  wrapper = shallow(<ArticleEdit />);
  return Promise.resolve().then(() => {
    wrapper.instance().handleSave();
    return flushPromises().then(() => {
      expect(wrapper.instance().state.message.show).toBeTruthy();
      expect(wrapper.instance().state.message.error).toBeTruthy();
      expect(wrapper.instance().state.message.text).toBe('Save Unsuccessful');
    });
  });
});

describe('ArticleEdit rendering', () => {
  beforeEach(() => {
    jest
      .spyOn(ArticleEdit.prototype, 'loadData')
      .mockImplementation(
        () => new Promise(resolve => resolve([topics, subTopics]))
      );
    expect.hasAssertions();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should display Create New Article header', () => {
    wrapper = shallow(<ArticleEdit empty />);
    return Promise.resolve().then(() => {
      wrapper.update();
      expect(
        wrapper
          .find('Heading1')
          .at(0)
          .childAt(0)
          .text()
      ).toBe('Create new article');
    });
  });
  it('should display Edit Article header', () => {
    wrapper = shallow(<ArticleEdit />);
    return Promise.resolve().then(() => {
      wrapper.update();
      expect(
        wrapper
          .find('Heading1')
          .at(0)
          .childAt(0)
          .text()
      ).toBe('Edit article');
    });
  });
  it('should pass topics and sub-topics to ArticleEdit Form', () => {
    wrapper = shallow(<ArticleEdit empty />);
    return Promise.resolve().then(() => {
      wrapper.update();
      const formProps = wrapper.find('Form').props();
      expect(formProps.topics).toEqual(topics);
      expect(formProps.sub_topics).toEqual(subTopics);
      expect(formProps.selectedTopic).toEqual(topics[0]);
      expect(formProps.selectedSubTopic).toBeNull();
    });
  });
  it('should display Content Edit pane', () => {
    wrapper = shallow(<ArticleEdit empty />);
    return Promise.resolve().then(() => {
      wrapper.update();
      const props = wrapper.find('ContentEdit').props();
      expect(props.content).toBe('');
      expect(props.edit).toBeFalsy();
      expect(props.handleFieldChange).toBeInstanceOf(Function);
    });
  });
  it('should display save button', () => {
    wrapper = shallow(<ArticleEdit empty />);
    return Promise.resolve().then(() => {
      wrapper.update();
      expect(wrapper.find('SaveButton').length).toBe(1);
      expect(
        wrapper
          .find('SaveButton')
          .at(0)
          .childAt(0)
          .text()
      ).toBe('Save');
    });
  });
  it('should display MessageBar', () => {
    wrapper = shallow(<ArticleEdit empty />);
    return Promise.resolve().then(() => {
      wrapper.update();
      expect(wrapper.find('MessageBar').length).toBe(1);
    });
  });
});
