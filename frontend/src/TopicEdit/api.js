import handleResponse from '../common/ErrorHandler';

/* eslint-disable import/prefer-default-export */

export const saveTopics = payload =>
  fetch('/api/v1/topics', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify(payload),
  }).then(handleResponse);

export const createTopic = payload =>
  fetch('/api/v1/topics/new', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify(payload),
  }).then(handleResponse);

export const saveSubTopics = payload =>
  fetch('/api/v1/subtopics', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify(payload),
  }).then(handleResponse);

export const getTopics = () =>
  fetch('/api/v1/topics', {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
    credentials: 'same-origin',
  });

export const getSubTopics = () =>
  fetch('/api/v1/subtopics', {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
    credentials: 'same-origin',
  });

/* eslint-enable import/prefer-default-export */
