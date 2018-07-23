import { fixPath, getIndexes, stayPositive } from './utils';

describe('SearchResults utils', () => {
  it('fixPath formats a string', () => {
    let input = 'foo>bar';
    expect(fixPath(input)).toBe('foo > bar');
    input = 'bazbaf';
    expect(fixPath(input)).toBe(input);
  });

  it('fixPath handles non-strings', () => {
    let input = {};
    expect(fixPath(input)).toBe('');
    input = null;
    expect(fixPath(input)).toBe('');
    input = false;
    expect(fixPath(input)).toBe('');
  });

  it('getIndexes returns indexes', () => {
    let source = 'bar baz foo bar foo baz';
    const query = 'foo';
    expect(getIndexes(source, query)).toEqual([8, 16]);

    source = 'lorem ipsum';
    expect(getIndexes(source, query)).toEqual([]);
  });

  it('getIndexes handles non-string inputs', () => {
    let source = {};
    let query = '';
    expect(getIndexes(source, query)).toEqual([]);

    source = null;
    query = '';
    expect(getIndexes(source, query)).toEqual([]);

    source = null;
    query = undefined;
    expect(getIndexes(source, query)).toEqual([]);
  });

  it('stayPositive subtracts, but stays positive (or zero)', () => {
    expect(stayPositive(4, 5)).toBe(0);
    expect(stayPositive(5, 4)).toBe(1);
  });

  it('stayPositive handles non-numbers', () => {
    expect(stayPositive(null, {})).toBe(0);
  });
});
