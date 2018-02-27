import React from 'react';
import JSONToHTML from '../JSONHandle/JSONToHTML.js';

export default class ContentArea extends React.Component{
		
	constructor(props){
		super(props);
		
		this.state = {
			innerHTML: undefined
		};
		
		
		this.loadJSON = this.loadJSON.bind(this);
	}
	
	loadJSON(location = './db/content/Example-Page.json'){
		
				
		let self = this;	
		let req = new Request(location);
		
		fetch(req)
						.then(   function(response) { console.log(response); return response.json();}    )
						.then(   function(responseJSON) { 
										let resultHTML = JSONToHTML(responseJSON.HTMLTree);
										self.setState( {innerHTML : resultHTML} );
																			
										
										
										
						     		}		);
		return '<p>loading......</p>';
		// in future: regexp to detect html tags: <(.*?)>(.|\n|\r)*?<\/(\1|)>	
	}
	
	
	componentWillMount(){
		let grabbedHTML = this.loadJSON();      //   fetchData(this.props.selectedUrl) ?
		this.setState({innerHTML: grabbedHTML});
	}	
	
	// componentWillUpdate  (){....}    -- copy/paste?    -if user clicks on another link in sidebar: need reload from new url
	
	render(){
		
		return (
			<section className='content-area' dangerouslySetInnerHTML={ {__html : this.state.innerHTML} }>
				
			</section>
		);
	}
	
	
	
}