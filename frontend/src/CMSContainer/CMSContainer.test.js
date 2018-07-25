import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup, waitForElement } from 'react-testing-library';
import 'jest-dom/extend-expect';

import CMSContainer from './CMSContainer';
import { Context } from '../App';

const articleList = [
  {
    _id: 'a123',
    subtopic: {
      _id: 'a456',
      name: 'About this wiki',
      order: 1,
      parent: 'a789',
    },
    title: 'Home',
    topic: {
      _id: 'a789',
      name: 'Voyage',
      order: 1,
    },
  },
];

const props = {
  history: {
    push: jest.fn(),
  },
};

function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('CMSContainer component', () => {
  afterEach(cleanup);

  it('on wide screen should render search input & button, side menu and welcome text', async () => {
    const getArticleList = jest
      .spyOn(CMSContainer.prototype, 'getArticles')
      .mockImplementation(() => new Promise(resolve => resolve(articleList)));

    const { getByText, getByTestId, queryByTestId } = renderWithRouter(
      <Context.Provider value={{ windowWidth: 1200 }}>
        <CMSContainer {...props} />
      </Context.Provider>,
      { route: '/cms' }
    );

    expect(getArticleList.mock.calls.length).toBe(1);
    expect(getByText('Search')).toBeVisible();
    expect(getByTestId('search-input')).toBeVisible();
    expect(queryByTestId('hamburger')).toBeNull();
    expect(getByText('Welcome')).toBeVisible();
    expect(getByTestId('sidebar')).toBeVisible();
    expect(await waitForElement(() => getByText(/Voyage$/))).toBeVisible();

    getArticleList.mockClear();
  });

  it('on mobile should render search input & button, hamburger and welcome text', () => {
    const getArticleList = jest
      .spyOn(CMSContainer.prototype, 'getArticles')
      .mockImplementation(() => new Promise(resolve => resolve(articleList)));

    const { getByText, getByTestId, queryByTestId } = renderWithRouter(
      <Context.Provider value={{ windowWidth: 850 }}>
        <CMSContainer {...props} />
      </Context.Provider>,
      { route: '/cms' }
    );

    expect(getArticleList.mock.calls.length).toBe(1);
    expect(getByText('Search')).toBeVisible();
    expect(getByTestId('search-input')).toBeVisible();
    expect(queryByTestId('hamburger')).toBeVisible();
    expect(getByText('Welcome')).toBeVisible();
    expect(queryByTestId('sidebar')).toBeNull();

    getArticleList.mockClear();
  });
});
