import {
  normalizeChildren,
  sortByOrder,
  prepareParents,
  prepareChildren,
} from './utils';

describe('TopicEdit utils', () => {
  describe('normalizeData', () => {
    it('normalizes data', () => {
      const parents = [
        { _id: '123abc', name: 'Voyage', order: 1 },
        { _id: '456def', name: 'Help', order: 2 },
      ];

      const children = [
        { _id: '1a', parent: '123abc', name: 'About1', order: 1 },
        { _id: '1b', parent: '456def', name: 'Help1', order: 1 },
        { _id: '1c', parent: '123abc', name: 'About3', order: 3 },
        { _id: '2e', parent: '456def', name: 'Help2', order: 2 },
        { _id: '4r', parent: '123abc', name: 'About2', order: 2 },
      ];

      const parentsNorm = [
        { _id: '123abc', name: 'Voyage', order: 0 },
        { _id: '456def', name: 'Help', order: 1 },
      ];

      const childrenNorm = {
        '123abc': [
          { _id: '1a', parent: '123abc', name: 'About1', order: 0 },
          { _id: '4r', parent: '123abc', name: 'About2', order: 1 },
          { _id: '1c', parent: '123abc', name: 'About3', order: 2 },
        ],
        '456def': [
          { _id: '1b', parent: '456def', name: 'Help1', order: 0 },
          { _id: '2e', parent: '456def', name: 'Help2', order: 1 },
        ],
      };

      expect(sortByOrder(parents)).toEqual(parentsNorm);
      expect(normalizeChildren(children)).toEqual(childrenNorm);
    });

    it('converts data for sending to server', () => {
      const parentsNorm = [
        { _id: '123abc', name: 'Voyage', order: 4 },
        { _id: '456def', name: 'Help', order: 1 },
      ];

      const childrenNorm = {
        '123abc': [
          { _id: '1a', parent: '123abc', name: 'About1', order: 0 },
          { _id: '4r', parent: '123abc', name: 'About2', order: 1 },
          { _id: '1c', parent: '123abc', name: 'About3', order: 2 },
        ],
        '456def': [
          { _id: '1b', parent: '456def', name: 'Help1', order: 0 },
          { _id: '2e', parent: '456def', name: 'Help2', order: 1 },
        ],
      };

      const parents = [
        { _id: '123abc', name: 'Voyage', order: 0 },
        { _id: '456def', name: 'Help', order: 1 },
      ];

      const children = [
        { _id: '1a', parent: '123abc', name: 'About1', order: 0 },
        { _id: '1b', parent: '456def', name: 'Help1', order: 0 },
        { _id: '1c', parent: '123abc', name: 'About3', order: 2 },
        { _id: '2e', parent: '456def', name: 'Help2', order: 1 },
        { _id: '4r', parent: '123abc', name: 'About2', order: 1 },
      ];

      children.sort((a, b) => a._id < b._id);

      expect(prepareParents(parentsNorm)).toEqual(parents);
      expect(prepareChildren(childrenNorm)).toEqual(children);
    });

    it('converts data and removes empty values', () => {
      const parentsNorm = [
        { _id: '123abc', name: 'Voyage', order: 4 },
        { _id: '456def', name: 'Help', order: 1 },
      ];

      const childrenNorm = {
        '123abc': [
          { _id: '1a', parent: '123abc', name: 'About1', order: 0 },
          { _id: '4r', parent: '123abc', name: 'About2', order: 1 },
          { _id: '1c', parent: '123abc', name: 'About3', order: 2 },
        ],
        '456def': [
          { _id: '1b', parent: '456def', name: 'Help1', order: 0 },
          { _id: '2e', parent: '456def', name: 'Help2', order: 1 },
        ],
      };

      const parents = [
        { _id: '123abc', name: 'Voyage', order: 0 },
        { _id: '456def', name: 'Help', order: 1 },
      ];

      const children = [
        { _id: '1a', parent: '123abc', name: 'About1', order: 0 },
        { _id: '1b', parent: '456def', name: 'Help1', order: 0 },
        { _id: '1c', parent: '123abc', name: 'About3', order: 2 },
        { _id: '2e', parent: '456def', name: 'Help2', order: 1 },
        { _id: '4r', parent: '123abc', name: 'About2', order: 1 },
      ];

      children.sort((a, b) => a._id < b._id);

      expect(prepareParents(parentsNorm)).toEqual(parents);
      expect(prepareChildren(childrenNorm)).toEqual(children);
    });
  });
});
