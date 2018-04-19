import handleResponse from '../common/ErrorHandler';

/* eslint-disable import/prefer-default-export */

export const getTopics = () =>
  fetch('/api/v1/topics', {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
    credentials: 'same-origin',
  }).then(handleResponse);

export const getSubTopics = () =>
  fetch('/api/v1/subtopics', {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
    credentials: 'same-origin',
  }).then(handleResponse);

/* eslint-enable import/prefer-default-export */
