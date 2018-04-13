import React from 'react';
import { getTree, getChildren } from './utils';
import { Wrapper } from './styled';

class Sidebar extends React.Component{
	
constructor(props) {
        super(props);
		this.state = {};
        
  }
	
	shouldComponentUpdate(nextProps, nextState){
		if(this.props.articles.length != nextProps.articles.length ||
		!this.state.articlesHtml && nextState.articlesHtml || 
		this.state.articlesHtml.length == 0 && nextState.articlesHtml.length>0){
			return true;
		}
		return false;
	}	

	componentDidMount(){
			const tree = getTree(this.props.articles);
  			const tre = getChildren(tree);				
			this.setState({ articlesHtml: tre});
			
		}	
	
	
	componentDidUpdate(){
			const tree = getTree(this.props.articles);
  			const tre = getChildren(tree);				
			this.setState({ articlesHtml: tre});
			
		}
  	  	
	
	  
	  
  render(){ 
  	  return <Wrapper>{this.state.articlesHtml && this.state.articlesHtml.length >0? this.state.articlesHtml : 'wait'}</Wrapper>;
  }
}

export default Sidebar;
