export default function JSONToHTML(tree) {
  //console.log(tree);
  let resultHTML = "";
  for (let i = 0; i < tree.length; i++) {
    resultHTML += wrapTag(tree[i]);
  }

  return resultHTML;
}

const NON_ATTRIBUTES = ["tag", "textContent", "children"];
const VOID_ELEMENTS = ["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"];

function wrapTag(element) {
  let innerContent = "";

  if (element.children) {
    for (let j = 0; j < element.children.length; j++) {
      innerContent += wrapTag(element.children[j]);
    }
  }

  let tag = element.tag;
  let attributes = "";
  for (let attr of Object.keys(element)) {
    if (NON_ATTRIBUTES.includes(attr)) {
      continue;
    }
    attributes += ` ${attr}="${element[attr]}"`;
    // TODO : add support boolean attributes (checked)
  }
  let textContent = element.textContent || "";
  innerContent += textContent;
	
  let voidElement = VOID_ELEMENTS.includes(tag)
 		
  let template = voidElement ? `<${tag}${attributes} />` : 
  		element.tag 
    ? `<${tag}${attributes}>${innerContent}</${tag}>`
    : innerContent;
  
  //console.log(template);

  return template;
}
