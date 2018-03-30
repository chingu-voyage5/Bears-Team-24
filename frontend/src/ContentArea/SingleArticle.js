import React from 'react';
import marked from 'marked';

export default class SingleArticle extends React.Component {
	render(){
		const articles = JSON.parse(localStorage.getItem('allArticles'));
		const index = JSON.parse(localStorage.getItem('articleIndex'));
      const options = { __html: marked(articles[index[this.props.id]].content) };

      return <div dangerouslySetInnerHTML={options} />;
	}
}