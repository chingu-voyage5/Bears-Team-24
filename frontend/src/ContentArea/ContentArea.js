import React from 'react';
import JSONToHTML from '../JSONHandle';

export default class ContentArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      innerHTML: undefined
    };

    this.loadJSON = this.loadJSON.bind(this);
  }
  componentWillMount() {
    const grabbedHTML = this.loadJSON(); //   fetchData(this.props.selectedUrl) ?
    this.setState({ innerHTML: grabbedHTML });
  }
  loadJSON(location = './db/content/Example-Page.json') {
    const self = this;
    const req = new Request(location);

    fetch(req)
      .then((response) => response.json())
      .then((responseJSON) => {
        const resultHTML = JSONToHTML(responseJSON.HTMLTree);
        self.setState({ innerHTML: resultHTML });
      });
    return '<p>loading......</p>';
  }
  // componentWillUpdate  (){....}    -- copy/paste?
  //   -if user clicks on another link in sidebar: need reload from new url

  render() {
    return (
      <section
        className="content-area"
        dangerouslySetInnerHTML={{ __html: this.state.innerHTML }}
      />
    );
  }
}
