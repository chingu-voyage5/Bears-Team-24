import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import CMSContainer from './CMSContainer';

const props = {
  history: {
    push: jest.fn(),
  },
};

xit('should render container', () => {
  const getArticleList = jest
    .spyOn(CMSContainer.prototype, 'getArticles')
    .mockImplementation(() => new Promise(resolve => resolve([])));
  const comp = mount(
    <Router>
      <CMSContainer {...props} />
    </Router>
  );
  return Promise.resolve(() => {
    comp.update();
    expect(getArticleList).toHaveBeenCalled();
    expect(comp.find('Sidebar').length).toBe(1);
    expect(comp.find('ContentArea').length).toBe(1);
  });
});
