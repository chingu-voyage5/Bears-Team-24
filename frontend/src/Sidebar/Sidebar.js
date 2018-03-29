import React from 'react';
import Collapsible from './Collapsible';
import { Wrapper } from './styled';

const Sidebar = () => {
  /*    Uncomment this
	  
	let tree = JSON.parse(localStorage.getItem('tree'));
	let root = Object.keys(tree);
	let markup = root.map( topic=> `
	<details>
	<summary className='panel-heading'>${tree[topic].titleDisplay}</summary>
		${Object.keys(tree[topic])
		.filter(t=> t!='titleDisplay')
		.map(sub=> `
		<details>
		<summary className='panel-heading'>${tree[topic][sub].titleDisplay}</summary>
			${Object.keys(tree[topic][sub])
			.filter(a=> a!='titleDisplay')
			.map(article=> `
			<a href='${'/cms/'+ topic+'|'+ sub+'|'+article}'>${tree[topic][sub][article].titleDisplay}</a>
		`).join('\n')}
		</details>
	
	`).join('')}
	</details>`).join('\n')	;
	
  	let options = {__html: markup};
  	 	
  	let view = <div dangerouslySetInnerHTML={options}></div>;
	
	
	*/

  /*  delete this line after uncomment */
  const view = '';

  return (
    <Wrapper>
      {view}
      <Collapsible title="About this wiki">Lorem ipsum dolor sit</Collapsible>
      <Collapsible title="About Voyages">Lorem ipsum dolor sit</Collapsible>
      <Collapsible title="Project Setup">Lorem ipsum dolor sit</Collapsible>
      <Collapsible title="Development Sprints">
        Lorem ipsum dolor sit
      </Collapsible>
      <Collapsible title="Project Closure">Lorem ipsum dolor sit</Collapsible>
      <Collapsible title="Tools & Resources">Lorem ipsum dolor sit</Collapsible>
    </Wrapper>
  );
};

export default Sidebar;
