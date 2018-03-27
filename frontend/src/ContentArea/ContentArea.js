import React from 'react';
import { Redirect } from 'react-router';

export default class ContentArea extends React.Component {
  
  componentWillMount() {
    
  }
  
  render() {
  	 let path = this.props.path;
  	 let view = 'none';
  	 let id = JSON.parse(localStorage.getItem('pathTable'))[path] || '';
  	 let articles = JSON.parse(localStorage.getItem('allArticles'));
  	 if(id){
  	 	// exists id for that path
  	 	let index = JSON.parse(localStorage.getItem('articleIndex'));
  	 	view = articles[index[id]].content;
  	 	
  	 }else if(path){
  	 	// illegal path - id not found
  	 	view = <Redirect to='/cms' />;
  	 }else{
  	 	// no additional path - we are at /cms page
  	 	let topics = [];
  	 	let subtopics = [];
  	 	articles.map(a => {
  	 		if(!topics.includes(a.topic)){
  	 			topics.push(a.topic)
  	 			};
  	 		if(!subtopics.includes(a.sub_topic)){
  	 			subtopics.push(a.sub_topic)
  	 			};
  	 	});
  	 	
  	 	view = `topics: ${topics}  , subtopics: ${subtopics}`;
  	 	
  	 }
  	
  	
    return (
      <div>
        <section
          className="content-area">
          {view}
        </section>
      </div>
    );
  }
}
