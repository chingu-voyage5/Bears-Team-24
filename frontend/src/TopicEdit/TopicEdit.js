import React from 'react';

// import TopicItem from './TopicItem';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import { TableCell, TableRow } from 'material-ui/Table';

import MessageBar from '../common/MessageBar';
import SaveButton from '../common/SaveButton';
import TopicSelector from './TopicSelector';
import TopicOrderTable from './TopicOrderTable';

import Wrapper, { ButtonWrapper, TopicWrapper } from './styled';

import saveTopicUpdates from './topicActions';
import saveSubTopicUpdates from './subTopicActions';
import orderCompareAsc from '../common/orderCompare';
import { getTopics, getSubTopics } from './api';

import { SMALL_WINDOW } from '../config';

/* eslint-disable camelcase */

export default class TopicEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      sub_topics: [],
      selectedTopic: null,
      message: { show: false, error: false, text: '' },
      horizontal: 'right',
      vertical: 'top',
    };
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

    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  orderTopicChange(e) {
    const { value: order, id } = e.target;
    const topics = this.state.topics.map(topic => {
      if (topics._id === id) {
        return { ...topic, order, isDirty: true };
      }
      return topic;
    });
    this.setState({ topics });
  }
  orderSubTopicChange(e) {
    const { value: order, id } = e.target;
    const sub_topics = this.state.sub_topics.map(sub_topic => {
      if (sub_topic._id === id) {
        return { ...sub_topic, order, isDirty: true };
      }
      return sub_topic;
    });
    this.setState({ sub_topics });
  }
  handleTopicSelect(event) {
    this.setState({ selectedTopic: event.target.value });
  }

  handleResize = () => {
    this.setState(() => ({
      mobile: window.innerWidth <= SMALL_WINDOW,
    }));
  };

  handleClose = () => {
    this.setState(() => ({
      message: { ...this.state.message, show: false },
    }));
  };

  handleSave = () => {
    saveTopicUpdates(this.state.topics).then(result => {
      if (result) {
        this.setState({
          message: { show: true, error: false, text: 'Save Successful' },
        });
      } else {
        this.setState({
          message: {
            show: true,
            error: true,
            text: 'Save Failed - please refresh',
          },
        });
      }
    });
    saveSubTopicUpdates(this.state.sub_topics).then(result => {
      if (result) {
        const sub_topics = this.state.sub_topics.slice().sort(orderCompareAsc);
        this.setState({
          sub_topics,
          message: { show: true, error: false, text: 'Save Successful' },
        });
      } else {
        this.setState({
          message: {
            show: true,
            error: true,
            text: 'SubTopic save failed - please refresh',
          },
        });
      }
    });
  };
  render() {
    const { selectedTopic, message, horizontal, vertical, mobile } = this.state;
    let isDirty = false;
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
    const sub_topic_rows = this.state.sub_topics.reduce((acc, sub) => {
      if (selectedTopic.isDirty || sub.isDirty) isDirty = true;
      if (sub.parent !== selectedTopic._id) return acc;
      return acc.concat(
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
      );
    }, []);
    return (
      <Wrapper mobile={mobile}>
        <h3>Topic and SubTopic ordering</h3>
        <TopicWrapper>
          1. Select a Topic:&nbsp;
          <TopicSelector
            selectedTopic={selectedTopic}
            onSelect={this.handleTopicSelect}
            topicList={topicList}
          />
        </TopicWrapper>
        <p>
          2. Set the order that you want the topics and subtopics to appear in
          the CMS sidebar view
        </p>
        <TopicOrderTable
          selectedTopic={selectedTopic}
          onTopicOrderChange={this.orderTopicChange}
          subTopicRows={sub_topic_rows}
        />
        <ButtonWrapper>
          <SaveButton disabled={!isDirty} onClick={this.handleSave} />
        </ButtonWrapper>
        <MessageBar
          anchor={{ vertical, horizontal }}
          message={message}
          handleClose={this.handleClose}
        />
      </Wrapper>
    );
  }
}
/* eslint-enable camelcase */
