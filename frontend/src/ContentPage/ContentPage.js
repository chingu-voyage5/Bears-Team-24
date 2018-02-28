import React from 'react';
import ContentArea from '../ContentArea/ContentArea.js';
import Navbar from '../Navbar/Navbar.js';

export default class ContentPage extends React.Component {
	
	render() {
		return (
		<React.Fragment>
			<Navbar />
			<ContentArea />
		</React.Fragment>
		);
	}
} 