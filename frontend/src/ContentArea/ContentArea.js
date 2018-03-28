import React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

export default class ContentArea extends React.Component {
  
  componentWillMount() {
    
  }
  
  render() {
  	 let path = this.props.path;
  	 let view = 'none';
  	 let id = JSON.parse(localStorage.getItem('pathTable'))[path] || '';
  	 let articles = JSON.parse(localStorage.getItem('allArticles'));
  	 if(id){
  	 	// exists id for that path
  	 	let index = JSON.parse(localStorage.getItem('articleIndex'));
  	 	view = articles[index[id]].content;
  	 	
  	 }else if(path){
  	 	// illegal path - id not found
		let levels = path.split('|');
		let summaryPath = [];
		let root = JSON.parse(localStorage.getItem('tree'));
		let currentLevel = root; 
		for(let i=0;i<levels.length;i++){
			if(currentLevel[levels[i]]){
				summaryPath.push(levels[i]);
				currentLevel = currentLevel[levels[i]];
			}else{
				
				break;
			}
		}  
		summaryPath = summaryPath.join('|'); 	 	
		if(!summaryPath){
			view = <Redirect to='/cms' />;
		}  else{
			
			
			let keys = Object.keys(currentLevel)
			.filter(k=> k!='_title');
			keys = keys.map(k => {
				
						let obj = {
							path: '|'+k,
							name: currentLevel[k]._title
						};
						
						return obj;
					
				
				});
						   
			
			view = (
			<div>
			<h1>{currentLevel._title}</h1>
			<ul>{keys.map(k => <li><Link to={'/cms/'+ summaryPath+ k.path}>{k.name}</Link></li>)}
			</ul>
			</div>
			);
			
		}	
		 	
  	 	
  	 	
  	 }else{
  	 	// no additional path - we are at /cms page
  	 let root = JSON.parse(localStorage.getItem('tree'));
  	 
			let keys = Object.keys(root)
			.filter(k=> k!='_title');
			keys = keys.map(k => {
				
						let obj = {
							path: k,
							name: root[k]._title
						};
						
						return obj;
					
				
				});
						   
			
			view = (
			<div>
			<h1>Index</h1>
			<ul>{keys.map(k => <li><Link to={'/cms/'+ k.path}>{k.name}</Link></li>)}
			</ul>
			</div>
			);
			
  	 	
  	 	
  	 	
  	 }
  	
  	
    return (
      <div>
        <section
          className="content-area">
          {view}
        </section>
      </div>
    );
  }
}
