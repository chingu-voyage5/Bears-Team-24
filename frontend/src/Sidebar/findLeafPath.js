/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
const findLeafPath = (tree, _id, path = []) => {
  let newPath = path.slice();
  if (tree._id) {
    newPath = path.concat(tree._id);
  }
  const keys = Object.keys(tree);

  for (const key of keys) {
    if (key !== '_id' && key !== 'expanded') {
      if (tree[key] === _id) {
        return newPath;
      }
      if (tree[key] instanceof Object) {
        const resultPath = findLeafPath(tree[key], _id, newPath);
        if (resultPath !== null) {
          return resultPath;
        }
      }
    }
  }
  return null;
};

export default findLeafPath;
