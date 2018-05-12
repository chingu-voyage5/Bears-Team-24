import { getTopics, getSubTopics } from './api';

const requestOptions = {
  credentials: 'same-origin',
  headers: { 'content-type': 'application/json' },
  method: 'GET',
};
const expectedResponse = {
  ok: true,
  headers: {
    get: () => 'application/json',
  },
  json: () => {},
};

it('should get topics', () => {
  const fspy = jest
    .spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve(expectedResponse));
  return getTopics().then(() => {
    expect(fspy).toHaveBeenCalledWith('/api/v1/topics', requestOptions);
  });
});

it('should get sub topics', () => {
  const fspy = jest
    .spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve(expectedResponse));
  return getSubTopics().then(() => {
    expect(fspy).toHaveBeenCalledWith('/api/v1/subtopics', requestOptions);
  });
});
