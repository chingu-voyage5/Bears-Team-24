export default function JSONToHTML(tree){
	//console.log(tree);
	let resultHTML = '';
	for (let i=0; i<tree.length; i++){
		resultHTML += wrapTag(tree[i]);
	}
	
	return resultHTML;
}

const NON_ATTRIBUTES = ["tag", "textContent", "children"];


function wrapTag(element){
	
	let innerContent = "";
	
	if(element.children){
		for(let j=0; j<element.children.length;j++){
			innerContent += wrapTag(element.children[j]);
		}
	}
	
	let tag = element.tag;
	let attributes = "";
	for (let attr of Object.keys(element)){
		if(NON_ATTRIBUTES.includes(attr)){
			continue;
		}
		attributes += ` ${attr}="${element[attr]}"`;
	}
	let textContent = element.textContent || '' ;
	innerContent += textContent;  	
   
   let template = `<${tag}${attributes}>${innerContent}</${tag}>`;
   // TODO : add attributes (array from db -> string), support <span> in text content
   
	//console.log(template);
	
	return template;
}