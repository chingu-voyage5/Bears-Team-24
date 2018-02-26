import React from 'react';


// TODO :  figure out how to grab raw text content and/or HTML of github wiki https://github.com/Chingu-cohorts/voyage-wiki/wiki

export default class ContentArea extends React.Component{
		
	constructor(props){
		super(props);
		
		this.state = {
			innerHTML: undefined
		};
		
		
		this.fetchData = this.fetchData.bind(this);
	}
	
	fetchData(selectedUrl){
		// url which is currently selected in sidebar navigation menu
		// ....
		// maybe should extract this function into its own module and update all references  
		
		let urlToGrabData = selectedUrl || 'https://cors-anywhere.herokuapp.com/https://loripsum.net/api';
		//uses lorem ipsum for example now , later will grab data from github chingu
		
		      
		let self = this;
		
		// AJAX example version: 
		fetch(urlToGrabData)
						.then(   function(response) { return response.text();}    )
						.then(   function(responseText) { 
						
										let resultHTML;
										let keyWithHTML = 'html';   // api response we expect is JSON object where one of props is html string
										//  { "status" : "ok",   "html" : "<h1>KOOL</h1> <p>This is the response HTML</p>" }
										
										try{ 
											resultHTML = JSON.parse(responseText)[keyWithHTML];
										}
										/* example api what i chose does not send data in JSON, only in HTML. so i build JSON object here */
										catch(error){
											//alert(error);
											
											let jsonObj = {};
											jsonObj[keyWithHTML] = responseText;
											
											let json = JSON.stringify(jsonObj);
											resultHTML = JSON.parse(json)[keyWithHTML];
											
										}
										
										
										self.setState( {innerHTML: resultHTML});
						     		}		);
	   // in future: regexp to detect html tags: <(.*?)>(.|\n|\r)*?<\/(\1|)>						     		
						     		
		
		return '<p>loading......</p>';       //this line runs immediately, displays loading text while AJAX request is in process
	}
	
	componentWillMount(){
		let grabbedHTML = this.fetchData();      //   fetchData(this.props.selectedUrl) ?
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