import React from 'react';

import TopicItem from './TopicItem';
import { getTopics, getSubTopics } from './actions';

/* eslint-disable camelcase */

export default class TopicEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { topics: [], sub_topics: [] };
    this.orderTopicChange = this.orderTopicChange.bind(this);
    this.orderSubTopicChange = this.orderSubTopicChange.bind(this);
  }
  componentDidMount() {
    getTopics()
      .then(topics => {
        this.setState({ topics });
      })
      // eslint-disable-next-line no-console
      .catch(e => console.error('mounted get topics failed:', e));
    getSubTopics()
      .then(sub_topics => this.setState({ sub_topics }))
      // eslint-disable-next-line no-console
      .catch(e => console.error('mounted get sub topics failed:', e));
  }
  orderTopicChange(item, order) {
    const topics = this.state.topics.map(topic => {
      if (topics._id === item.id) {
        return { ...topic, order };
      }
      return topic;
    });
    this.setState({ topics });
  }
  orderSubTopicChange(id, order) {
    const sub_topics = this.state.sub_topics.map(sub_topic => {
      if (sub_topic._id === id) {
        return { ...sub_topic, order };
      }
      return sub_topic;
    });
    this.setState({ sub_topics });
  }
  render = () => {
    const list = this.state.topics.reduce((acc, topic) => {
      const nl = [];
      nl.push(
        <TopicItem
          key={topic._id}
          item={topic}
          orderChange={this.orderTopicChange}
        />
      );
      const sts = this.state.sub_topics.reduce((ac2, st) => {
        if (topic._id === st.parent) {
          return ac2.concat(
            <TopicItem
              key={st._id}
              indent="1rem"
              item={st}
              orderChange={this.orderSubTopicChange}
            />
          );
        }
        return ac2;
      }, []);
      return acc.concat(nl, sts);
    }, []);
    return <div>{list}</div>;
  };
}
/* eslint-enable camelcase */
