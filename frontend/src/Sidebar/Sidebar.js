import React from 'react';
import { getTree, getChildren } from './utils';
import { getArticlesJSON } from './utilsBypass';
import { Wrapper } from './styled';

class Sidebar extends React.Component{
	
constructor(props) {
        super(props);

        this.state = {
            articles : []  
        };

  }
	
	
	
	componentDidMount(){
		if(this.state.articles.length == 0){
			getArticlesJSON().then(res => {
			const tree = getTree(res);
  			const tre = getChildren(tree);				
				
			this.setState({ articles: res, articlesHtml: tre});
			});
		}
  	  	
	}
	  
	  
  render(){ 
  	
	  return <Wrapper>{this.state.articlesHtml}</Wrapper>;
  }
}

export default Sidebar;
