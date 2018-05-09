const expandTree = (tree, id, expanded) => {
  const copy = {};
  const keys = Object.keys(tree);
  keys.forEach(k => {
    if (typeof tree[k] === 'string') {
      copy[k] = tree[k];
      if (k === '_id') {
        if (tree._id === id) {
          copy.expanded = expanded;
        } else {
          copy.expanded = tree.expanded;
        }
      }
    } else if (typeof tree[k] === 'object') {
      copy[k] = expandTree(tree[k], id, expanded);
    }
  });
  return copy;
};

export default expandTree;
