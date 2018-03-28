const NON_ATTRIBUTES = ['tag', 'textContent', 'children'];
const VOID_ELEMENTS = [
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
];

function wrapTag(element) {
  let innerContent = '';

  if (element.children) {
    for (let j = 0; j < element.children.length; j += 1) {
      innerContent += wrapTag(element.children[j]);
    }
  }

  const { tag } = element;
  let attributes = '';
  const objKeys = Object.keys(element);
  for (let x = 0; x < objKeys.length; x += 1) {
    const attr = objKeys[x];
    if (!NON_ATTRIBUTES.includes(attr)) {
      attributes += ` ${attr}="${element[attr]}"`;
    }
    // TODO : add support boolean attributes (checked)
  }
  const textContent = element.textContent || '';
  innerContent += textContent;

  const voidElement = VOID_ELEMENTS.includes(tag);

  let template = innerContent;
  if (voidElement) {
    template = `<${tag}${attributes} />`;
  } else if (element.tag) {
    template = `<${tag}${attributes}>${innerContent}</${tag}>`;
  }

  return template;
}

export default function JSONToHTML(tree) {
  // console.log(tree);
  let resultHTML = '';
  for (let i = 0; i < tree.length; i += 1) {
    resultHTML += wrapTag(tree[i]);
  }

  return resultHTML;
}
