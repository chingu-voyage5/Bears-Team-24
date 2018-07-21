import React from 'react';
import ReactDOM from 'react-dom';

import MarkdownParser from './MarkdownParser';

const props = {
  content: 'Foo',
};

describe('NowPlaying component', () => {
  it('should render', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MarkdownParser {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
