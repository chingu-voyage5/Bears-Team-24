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
						.then(   function(response) {return response.text();}    )
						.then(   function(responseText) { self.setState( {innerHTML: responseText});     });
		
		return '<p>loading......</p>';       //line runs immediately, displays text while AJAX request in process
	}
	
	componentWillMount(){
		let grabbedText = this.fetchData();      //   fetchData(this.props.selectedUrl) ?
		this.setState({innerHTML: grabbedText});
	}	
	
	// componentWillUpdate  (){....}    -- copy/paste?    -if user clicks on another link in sidebar: need reload from new url
	
	render(){
		
		return (
			<section className='content-area' dangerouslySetInnerHTML={ {__html : this.state.innerHTML} }>
				
			</section>
		);
	}
	
	
	
}