import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import ArticleEdit from './ArticleEdit';

const topics = [{ _id: '1', name: 'Voyage', order: 1 }];
const subTopics = [{ _id: '2', parent: '1', name: 'About Voyages', order: 2 }];

let wrapper;

describe('ArticleEdit', () => {
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
