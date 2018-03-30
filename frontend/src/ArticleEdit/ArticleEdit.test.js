import React from 'react';
import { shallow } from 'enzyme';

import ArticleEdit from '.';

describe('ArticleEdit component', () => {
  it('renders edit article page', () => {
    const wrapper = shallow(<ArticleEdit />);

    expect(
      wrapper
        .find('Heading1')
        .children()
        .text()
    ).toBe('Edit article');

    expect(wrapper.find('Input').length).toBe(3);
    expect(wrapper.find('Editor').length).toBe(1);
    expect(wrapper.find('Tab').length).toBe(2);
    expect(wrapper.find('Textarea').length).toBe(1);
    expect(wrapper.find('Preview').length).toBe(0);

    wrapper.setState({ article: { title: 'some title' } });

    expect(
      wrapper
        .find('Input')
        .at(0)
        .props().value.length
    ).not.toBe(0);
  });

  it('renders content Preview', () => {
    const wrapper = shallow(<ArticleEdit />);

    expect(wrapper.find('Textarea').length).toBe(1);
    expect(wrapper.find('Preview').length).toBe(0);

    wrapper.setState({ edit: false, article: { content: 'some content' } });

    expect(wrapper.find('Textarea').length).toBe(0);
    expect(wrapper.find('Preview').length).toBe(1);
  });
});
