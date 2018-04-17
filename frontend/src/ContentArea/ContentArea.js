import React from 'react';
import PropTypes from 'prop-types';
import SingleArticle from './SingleArticle';
import { getArticle } from './actions';

export default class ContentArea extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      view: 'Loading...',
    };
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.loadArticle(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id) {
      this.loadArticle(nextProps.match.params.id);
    }
  }

  loadArticle(id) {
    getArticle(id).then(article => {
      this.setState({
        view: <SingleArticle content={article.content} />,
      });
    });
  }

  render() {
    return (
      <div>
        <section className="content-area">{this.state.view}</section>
      </div>
    );
  }
}
