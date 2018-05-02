import React from 'react';

import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import { TableCell, TableRow } from 'material-ui/Table';

import MessageBar from '../common/MessageBar';
import PrimaryButton from '../common/PrimaryButton';
import SaveButton from '../common/SaveButton';
import TopicSelector from './TopicSelector';
import TopicOrderTable from './TopicOrderTable';

import Wrapper, { ButtonWrapper, TopicWrapper } from './styled';

import saveTopicUpdates from './topicActions';
import saveSubTopicUpdates from './subTopicActions';
import orderCompareAsc from '../common/orderCompare';
import { getTopics, createTopic, getSubTopics } from './api';

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
    this.onNewTopic = this.onNewTopic.bind(this);
    this.onNewSubTopic = this.onNewSubTopic.bind(this);
    this.onTopicChange = this.onTopicChange.bind(this);
    this.onSubTopicChange = this.onSubTopicChange.bind(this);
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
  onNewTopic() {
    const selectedTopic = {
      name: 'Topic Name',
      order: this.state.topics.length + 1,
    };
    // we have to create a topic to get an _id
    createTopic(selectedTopic).then(result => {
      if (result.success) {
        selectedTopic._id = result._id;
        this.setState({
          topics: [...this.state.topics, selectedTopic],
          selectedTopic,
          message: { show: true, error: false, text: 'Topic Created' },
        });
      } else {
        this.setState({
          message: {
            show: true,
            error: true,
            text: 'Topic create failed - please refresh',
          },
        });
      }
    });
  }
  onNewSubTopic() {
    const { selectedTopic } = this.state;
    const nextOrder = this.state.sub_topics.reduce((acc, sub) => {
      if (sub.parent === selectedTopic._id) {
        return acc + 1;
      }
      return acc;
    }, 1); // order is one based
    this.setState({
      sub_topics: this.state.sub_topics.concat({
        _id: `${nextOrder}`,
        parent: this.state.selectedTopic._id,
        name: 'Sub Topic Name',
        order: nextOrder,
      }),
    });
  }
  onTopicChange(e) {
    const { name, value, id } = e.target;
    const topics = this.state.topics.map(topic => {
      if (topic._id === id) {
        return { ...topic, [name]: value, isDirty: true };
      }
      return topic;
    });
    const selectedTopic = topics.reduce((acc, topic) => {
      if (topic._id === id) {
        return topic;
      }
      return acc;
    }, {});
    this.setState({ topics, selectedTopic });
  }
  onSubTopicChange(e) {
    const { name, value, id } = e.target;
    const sub_topics = this.state.sub_topics.map(sub_topic => {
      if (sub_topic._id === id) {
        return { ...sub_topic, [name]: value, isDirty: true };
      }
      return sub_topic;
    });
    this.setState({ sub_topics });
  }
  handleTopicSelect(event) {
    const selectedTopic = this.state.topics.reduce((acc, topic) => {
      if (topic._id === event.target.value) {
        return topic;
      }
      return acc;
    }, {});
    this.setState({ selectedTopic });
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
        const topicList = this.state.topics.slice().sort(orderCompareAsc);
        const topics = topicList.map(topic => {
          const { isDirty, ...rest } = topic;
          return rest;
        });
        this.setState({
          topics,
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
        const subList = this.state.sub_topics.slice().sort(orderCompareAsc);
        const sub_topics = subList.map(sub => {
          const { isDirty, ...rest } = sub;
          return rest;
        });
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
      return <div>Loading ...</div>;
    }
    const topicList = this.state.topics.map(topic => (
      <MenuItem key={topic._id} value={topic._id}>
        {topic.name}
      </MenuItem>
    ));
    const sub_topic_rows = this.state.sub_topics.reduce((acc, sub) => {
      if (selectedTopic.isDirty || sub.isDirty) isDirty = true;
      if (sub.parent !== selectedTopic._id) return acc;
      return acc.concat(
        <TableRow key={sub._id}>
          <TableCell>
            <TextField
              id={sub._id}
              name="name"
              value={sub.name}
              onChange={this.onSubTopicChange}
            />
          </TableCell>
          <TableCell>
            <TextField
              id={sub._id}
              name="order"
              value={`${sub.order}`}
              onChange={this.onSubTopicChange}
            />
          </TableCell>
        </TableRow>
      );
    }, []);
    return (
      <Wrapper mobile={mobile}>
        <ButtonWrapper>
          <PrimaryButton onClick={this.onNewTopic}>New Topic</PrimaryButton>
          <PrimaryButton onClick={this.onNewSubTopic}>
            New SubTopic
          </PrimaryButton>
        </ButtonWrapper>
        <h3>Topic and SubTopic ordering</h3>
        <TopicWrapper>
          1. Select a Topic:&nbsp;
          <TopicSelector
            selectedTopic={selectedTopic._id}
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
          onTopicChange={this.onTopicChange}
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
