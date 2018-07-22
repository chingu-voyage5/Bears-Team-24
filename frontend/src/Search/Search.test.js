import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Search from './Search';

const props = {
  onSubmit: () => {},
};

describe('Search component', () => {
  afterEach(cleanup);

  it('should render', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should enable search button when input field is not empty', () => {
    const { getByTestId, getByText } = render(<Search {...props} />);
    const searchInput = getByTestId('search-input');
    const searchBtn = getByText('Search');

    expect(searchBtn).toBeDisabled();

    searchInput.value = 'foo';

    fireEvent.change(searchInput);

    expect(searchBtn).not.toBeDisabled();
  });

  it('should handle search if input is not empty', () => {
    const spyFetch = jest.fn();
    const { getByTestId, getByText } = render(
      <Search {...props} onSubmit={spyFetch} />
    );
    const searchInput = getByTestId('search-input');
    const searchBtn = getByText('Search');

    searchInput.value = 'foo';

    fireEvent.change(searchInput);
    fireEvent.submit(searchBtn);

    expect(spyFetch.mock.calls.length).toBe(1);
    expect(spyFetch.mock.calls[0][0]).toBe('foo');
  });
});
