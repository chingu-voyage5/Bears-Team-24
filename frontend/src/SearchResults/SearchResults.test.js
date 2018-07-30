import React from 'react';
import ReactDOM from 'react-dom';

import SearchResults from './SearchResults';

const props = {
  onClick: () => {},
  query: '',
  results: [],
};

describe('Search component', () => {
  it('should render', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SearchResults {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
