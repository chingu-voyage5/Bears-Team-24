let html =
  '<p>text</p><div class="area"><p>tex<span>t</span>1</p><p>text2</p></div><div><p>text3</p><p>text4</p></div>';

//regex101.com
const TAG_DETECT = /<(\S+?){1}(\s+.*?)?>(.|\s)*?<\/(\1|)>/g;

// TODO : return html tree, support auto-closing tags img,input

function HTMLToJSON(HTMLString) {
  /*input: html code, output: JSON structured for reading by ContentArea */
  let resultObj = {};
  let structure = detectElements(HTMLString);

  return structure;
}

function detectElements(html) {
  let tree = [];

  let tags = html.match(TAG_DETECT);

  let elements = [];

  if (!tags) {
    elements.push(html);
  } else {
    let smartHTML = html.replace(TAG_DETECT, '<>');
    let pos = 0;
    let count = 0;
    while (pos < smartHTML.length) {
      let endString = smartHTML.slice(pos);
      if (endString.startsWith('<>')) {
        elements.push(tags[count]);
        count++;
        pos += 2;
      } else {
        let stop = endString.indexOf('<>');

        if (stop == -1) {
          elements.push(endString);
          break;
        } else {
          let text = endString.slice(0, stop);
          if (text.length > 0) {
            elements.push(text);
          }
          pos += stop;
        }
      }
    }
  }

  //console.log(elements);

  for (let i = 0; i < elements.length; i++) {
    tree.push(unwrap(elements[i].trim()));
    if (tree[i].children) {
      let innerHTML = tree[i]['inner HTML'];
      // delete tree[i]["inner HTML"];
      // uncomment in production version
      tree[i].children = detectElements(innerHTML);
    }
  }
  return tree;
}

function unwrap(html) {
  /* parameter html always is wrapped in tag because of reg exp */
  /* function removes wrapper tag and stores its properties into obj */
  let temp = html;
  let obj = {};

  if (!temp.startsWith('<')) {
    obj.textContent = temp;
    return obj;
  }

  let stop = temp.indexOf('>');
  let openingTag = temp
    .slice(1, stop)
    .replace('/S+/g', ' ')
    .split(' ');

  obj.tag = openingTag[0];
  for (let j = 1; j < openingTag.length; j++) {
    let [attr, val] = openingTag[j].split('=');
    obj[attr] = val.replace(/\"/g, '');
  }
  temp = temp.slice(stop + 1); // remove opening tag
  temp = temp.slice(0, temp.lastIndexOf('<')); // remove closing tag

  // check if there are nested tags
  if (!temp.match(TAG_DETECT)) {
    // no nested tags -> element contains only text content
    obj.textContent = temp;
  } else {
    // element contains nested tags and maybe text content
    obj.children = [];
    obj['inner HTML'] = temp; // here bracket notation: allows to use space in keyname - protect from overwriting HTML attributes
  }

  return obj;
}

console.log(HTMLToJSON(html));
