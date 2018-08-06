import React from 'react';
import ReactDOM from 'react-dom';
import 'jest-styled-components';

import TopicEdit from './TopicEdit';

const props = {};

describe('TopicEdit component', () => {
  xit('should render', () => {
    jest
      .spyOn(TopicEdit.prototype, 'fetchData')
      .mockImplementation(() => new Promise(resolve => resolve({})));

    const div = document.createElement('div');
    ReactDOM.render(<TopicEdit {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
