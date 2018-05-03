import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import ArticleEdit from './ArticleEdit';

const topics = [
  { _id: '1', name: 'Voyage', order: 1 },
  { _id: '2', name: 'PMRoK', order: 2 },
];
const subTopics = [
  { _id: '10', parent: '1', name: 'About wiki', order: 1 },
  { _id: '11', parent: '1', name: 'About Voyages', order: 2 },
  { _id: '12', parent: '1', name: 'About PMRoK', order: 1 },
];

let wrapper;

it('should set article topic and subtopic', () => {
  wrapper = shallow(<ArticleEdit empty />);
  wrapper.instance().setTopics(topics[0], subTopics[0]);
  expect(wrapper.instance().state.article).toEqual({
    title: '',
    order: 1,
    topic: topics[0],
    sub_topic: subTopics[0],
    content: '',
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
