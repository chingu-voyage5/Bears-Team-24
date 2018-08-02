// eslint-disable-next-line
export const sortByOrder = arr => {
  const copy = [...arr];
  copy.sort((a, b) => a.order - b.order);
  return copy.map((n, i) => ({ ...n, order: i }));
};

export const normalizeChildren = arr => {
  const norm = arr.reduce((acc, b) => {
    if (!acc[b.parent]) {
      acc[b.parent] = [];
    }
    acc[b.parent].push(b);
    return acc;
  }, {});

  Object.keys(norm).forEach(key => {
    norm[key].sort((a, b) => a.order - b.order);
    norm[key] = norm[key].map((k, i) => ({ ...k, order: i }));
  });

  return norm;
};

export const prepareParents = arr => arr.map((a, i) => ({ ...a, order: i }));

export const prepareChildren = obj => {
  const result = Object.values(obj).reduce((acc, arr) => {
    acc.push(...arr.map((a, i) => ({ ...a, order: i })));
    return acc;
  }, []);
  result.sort((a, b) => a._id < b._id);
  return result;
};
