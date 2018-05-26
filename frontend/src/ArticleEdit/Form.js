import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemInput from '../ListItemInput';
import TopicSelector from '../TopicEdit/TopicSelector';

import { Label } from './styled';

/* eslint-disable camelcase */
export default class Form extends React.Component {
  static propTypes = {
    mobile: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
    topics: PropTypes.array.isRequired,
    sub_topics: PropTypes.array.isRequired,
    selectedTopic: PropTypes.object.isRequired,
    selectedSubTopic: PropTypes.any,
    handleFieldChange: PropTypes.func.isRequired,
    setTopics: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selectedSubTopic: Form.nullSubTopic,
  };

  static nullSubTopic = { _id: '0' };

  handleTopicSelect = e => {
    const selectedTopic = this.props.topics.reduce((acc, topic) => {
      if (topic._id === e.target.value) {
        return topic;
      }
      return acc;
    }, {});
    const selectedSubTopic = null;
    this.props.setTopics(selectedTopic, selectedSubTopic);
  };

  handleSubTopicSelect = e => {
    const selectedSubTopic = this.props.sub_topics.reduce((acc, sub) => {
      if (sub._id === e.target.value) {
        return sub;
      }
      return acc;
    }, null);
    this.props.setTopics(this.props.selectedTopic, selectedSubTopic);
  };
  render() {
    const {
      mobile,
      title,
      order,
      handleFieldChange,
      topics,
      sub_topics,
      selectedTopic,
      selectedSubTopic,
    } = this.props;
    const topicList = topics.map(topic => (
      <MenuItem key={topic._id} value={topic._id}>
        {topic.name}
      </MenuItem>
    ));
    const subTopicList = sub_topics.reduce((acc, sub) => {
      let cac = [...acc];
      if (acc.length === 0) {
        cac = acc.concat(
          <MenuItem key={0} value="0">
            None
          </MenuItem>
        );
      }
      if (sub.parent === selectedTopic._id) {
        return cac.concat(
          <MenuItem key={sub._id} value={sub._id}>
            {sub.name}
          </MenuItem>
        );
      }
      return acc;
    }, []);
    const fixedSelectedSubTopic = selectedSubTopic || Form.nullSubTopic;
    return (
      <List>
        <ListItemInput
          mobile={mobile}
          label="Title"
          name="title"
          value={title}
          onChange={handleFieldChange}
        />
        <ListItemInput
          mobile={mobile}
          label="Order"
          name="order"
          value={order}
          onChange={handleFieldChange}
        />
        <ListItem>
          <Label>
            <Typography variant="title">Topic:</Typography>
          </Label>
          <TopicSelector
            selectedTopic={selectedTopic._id}
            onSelect={this.handleTopicSelect}
            topicList={topicList}
          />
        </ListItem>
        <ListItem>
          <Label>
            <Typography variant="title">Sub Topic:</Typography>
          </Label>
          <TopicSelector
            selectedTopic={fixedSelectedSubTopic._id}
            onSelect={this.handleSubTopicSelect}
            topicList={subTopicList}
          />
        </ListItem>
      </List>
    );
  }
}
