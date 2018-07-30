export const fixPath = (path = '') => {
  if (typeof path !== 'string') {
    return '';
  }

  return path.split('>').join(' > ');
};

export const getIndexes = (source, query) => {
  if (typeof source !== 'string' || typeof query !== 'string') {
    return [];
  }

  const result = [];

  for (let i = 0; i < source.length; i += 1) {
    if (source.substring(i, i + query.length).toLowerCase() === query) {
      result.push(i);
    }
  }

  return result;
};

export const stayPositive = (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return 0;
  }

  return a - b < 0 ? 0 : a - b;
};
