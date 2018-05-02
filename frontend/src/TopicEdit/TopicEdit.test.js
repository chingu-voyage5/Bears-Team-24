import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import TopicEdit from './TopicEdit';

jest.mock('./api');

let wrapper;

describe('TopicEdit', () => {
  beforeEach(() => {
    wrapper = shallow(<TopicEdit />);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should display new topic and sub-topic buttons', () =>
    Promise.resolve().then(() => {
      wrapper.update();
      expect(wrapper.find('PrimaryButton').length).toBe(2);
      expect(
        wrapper
          .find('PrimaryButton')
          .at(0)
          .childAt(0)
          .text()
      ).toBe('New Topic');
      expect(
        wrapper
          .find('PrimaryButton')
          .at(1)
          .childAt(0)
          .text()
      ).toBe('New SubTopic');
    }));
  it('should display save button', () =>
    Promise.resolve().then(() => {
      wrapper.update();
      expect(wrapper.find('SaveButton').length).toBe(1);
      expect(wrapper.find('SaveButton').text()).toBe('<SaveButton />');
    }));
  it('should display topic selector', () =>
    Promise.resolve().then(() => {
      wrapper.update();
      expect(wrapper.find('TopicSelector').length).toBe(1);
    }));
  it('should display message bar', () =>
    Promise.resolve().then(() => {
      wrapper.update();
      expect(wrapper.find('MessageBar').length).toBe(1);
    }));
  it('should display sub topic rows', () =>
    Promise.resolve().then(() => {
      wrapper.update();
      expect(wrapper.find('TopicOrderTable').length).toBe(1);
    }));
});
