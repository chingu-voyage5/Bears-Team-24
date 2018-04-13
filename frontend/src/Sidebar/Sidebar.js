import React from 'react';
import { getTree, getChildren } from './utils';
import { Wrapper } from './styled';

class Sidebar extends React.Component{
	
constructor(props) {
        super(props);

        this.state = {
            articlesHtml : []  
        };

  }
	
	shouldComponentUpdate(nextProps, nextState){
		if(this.props.articles != nextProps.articles || this.state.articlesHtml.length != nextState.articlesHtml.length){
			return true;
		}
		return false;
	}
	
	componentDidUpdate(){
			console.log(this.props);
			const tree = getTree(this.props.articles);
  			const tre = getChildren(tree);				
			this.setState({ articlesHtml: tre});
			
		}
  	  	
	
	  
	  
  render(){ 
  	
	  return <Wrapper>{this.state.articlesHtml}</Wrapper>;
  }
}

export default Sidebar;
