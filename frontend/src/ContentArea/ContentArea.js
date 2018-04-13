import React from 'react';
import PropTypes from 'prop-types';
import SingleArticle from './SingleArticle';

export default class ContentArea extends React.Component {
   constructor(props){
   	super(props);
   	this.state = {
   		view: 'Article not found'
   	}
   } 
	   
   componentDidMount(){
   const { articleId } = this.props;
	  	
	fetch(`/api/v1/articles/${articleId}`)
  	.then(res=> res.json())
  	.then(data => {
  		if(data.length > 0){
  		this.setState({view : <SingleArticle content={data[0].content} />} )
  		};
  	  		
  	})
  	.catch(err => {
  		this.setState({view : err});
  	});
  	
  	  	
   } 
   
   componentDidUpdate(prevProps){
   const { articleId } = this.props;
	
	if(prevProps.articleId != articleId){  	
	fetch(`/api/v1/articles/${articleId}`)
  	.then(res=> res.json())
  	.then(data => {
  		if(data.length > 0){
  		this.setState({view : <SingleArticle content={data[0].content} />} )
  		};
  	  		
  	})
  	.catch(err => {
  		this.setState({view : err});
  	});
  	}
  	
  	  	
   } 
    
  render() {
	
  	return (
      <div>
        <section className="content-area">{this.state.view}</section>
      </div>
    );  	
    
    
    
    
  }
}

ContentArea.propTypes = {
  articleId: PropTypes.string,
  articleIndex: PropTypes.object,
  articles: PropTypes.array,
};

ContentArea.defaultProps = {
  articleId: '',
  articleIndex: {},
  articles: [],
};
