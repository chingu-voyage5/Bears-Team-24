import React from 'react';

export default class ContentArea extends React.Component{
		
	constructor(props){
		super(props);
		this.fetchData = this.fetchData.bind(this);
	}
	
	fetchData(url){
		return 'Test';
	}
	
	render(){
		
		let text = this.fetchData();
		return (
			<div>
				<p>{text}</p>
			</div>
		);
	}	
}