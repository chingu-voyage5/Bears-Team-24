import React from 'react';

// import TopicItem from './TopicItem';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import Button from 'material-ui/Button';
import Table, {
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from 'material-ui/Table';

import Wrapper, { TopicWrapper, SelectWrapper } from './styled';

import { getTopics, getSubTopics, updateOrder } from './actions';

/* eslint-disable camelcase */

export default class TopicEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { topics: [], sub_topics: [], selectedTopic: null };
    this.orderTopicChange = this.orderTopicChange.bind(this);
    this.orderSubTopicChange = this.orderSubTopicChange.bind(this);
    this.handleTopicSelect = this.handleTopicSelect.bind(this);
  }
  componentDidMount() {
    getTopics()
      .then(topics => {
        this.setState({ topics, selectedTopic: topics[0] });
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
  handleTopicSelect(event) {
    this.setState({ selectedTopic: event.target.value });
  }
  handleSave() {
    console.log('save something');
  }
  render() {
    const { selectedTopic } = this.state;
    if (
      this.state.topics.length === 0 ||
      this.state.sub_topics.length === 0 ||
      selectedTopic === null
    ) {
      return null;
    }
    const topicList = this.state.topics.map(topic => (
      <MenuItem key={topic._id} value={topic}>
        {topic.name}
      </MenuItem>
    ));
    const sub_topic_rows = this.state.sub_topics
      .filter(sub => sub.parent === selectedTopic._id)
      .map(sub => (
        <TableRow key={sub._id}>
          <TableCell>{sub.name}</TableCell>
          <TableCell>
            <TextField
              id={sub._id}
              name="order"
              value={sub.order}
              onChange={this.orderSubTopicChange}
            />
          </TableCell>
        </TableRow>
      ));
    console.log('selected topic:', selectedTopic);
    return (
      <Wrapper>
        <h3>Topic and SubTopic ordering</h3>
        <TopicWrapper>
          1. Select a Topic:&nbsp;
          <SelectWrapper
            value={selectedTopic}
            onChange={this.handleTopicSelect}
          >
            {topicList}
          </SelectWrapper>
        </TopicWrapper>
        <p>
          2. Set the order that you want the topics and subtopics to appear in
          the CMS sidebar view
        </p>
        <Paper>
          <Table>
            {/* TODO: styled */}
            <TableHead style={{ background: '#eee' }}>
              <TableRow key={selectedTopic._id}>
                <TableCell>{selectedTopic.name}</TableCell>
                <TableCell>
                  <TextField
                    id={selectedTopic._id}
                    name="topic"
                    value={selectedTopic.order}
                    onChange={this.orderTopicChange}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{sub_topic_rows}</TableBody>
          </Table>
        </Paper>
      </Wrapper>
    );
  }
}
/* eslint-enable camelcase */
