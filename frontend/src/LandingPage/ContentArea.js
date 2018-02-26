import React from 'react';

export default class ContentArea extends React.Component{
		
	constructor(props){
		super(props);
		
		this.state = {
			text: undefined
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
						.then(   function(responseText) { self.setState( {text: responseText});     });
		
		return 'loading......';       //line runs immediately, displays text while AJAX request in process
	}
	
	componentWillMount(){
		let grabbedText = this.fetchData();      //   fetchData(this.props.selectedUrl) ?
		this.setState({text: grabbedText});
	}	
	
	render(){
		
		return (
			<div>
				{this.state.text}
			</div>
		);
	}
	
	
	
}