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
      content: '',
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
      this.setState({ content: article.content });
    });
  }

  render() {
    const { content } = this.state;
    return (
      <div>
        <section className="content-area">
          {content ? <SingleArticle content={content} /> : 'Loading...'}
        </section>
      </div>
    );
  }
}
