import React from 'react';

import TopicItem from './TopicItem';
import actions from '../Articles/actions';

export default class TopicEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [] };
    this.orderChange = this.orderChange.bind(this);
  }
  componentDidMount() {
    actions
      .getAll()
      .then(articles => {
        this.setState({ articles });
      })
      // eslint-disable-next-line no-console
      .catch(e => console.error('Topic mount failed:', e));
  }
  orderChange(article, order) {
    const articles = this.state.articles.map(art => {
      if (art._id === article._id) {
        return { ...art, order };
      }
      return art;
    });
    this.setState({ articles });
  }
  render = () => {
    const list = this.state.articles
      .reduce((acc, cur) => {
        const found = acc.find(
          art =>
            cur.topic._id === art.topic._id &&
            cur.sub_topic._id === art.sub_topic._id
        );
        if (found) return acc;
        return acc.concat(cur);
      }, [])
      .map(art => (
        <TopicItem key={art._id} item={art} orderChange={this.orderChange} />
      ));
    return <div>{list}</div>;
  };
}
