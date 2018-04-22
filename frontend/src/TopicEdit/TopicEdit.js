import React from 'react';

// import TopicItem from './TopicItem';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';

import Wrapper, {
  ButtonWrapper,
  TopicWrapper,
  SelectWrapper,
  TableHeadWrapper,
} from './styled';

import { getTopics, getSubTopics, saveTopics, saveSubTopics } from './actions';

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

  handleClose = () => {};

  handleSave = () => {
    const topic_updates = this.state.topics.reduce((acc, topic) => {
      if (topic.isDirty) {
        const { isDirty, ...updateTopic } = topic;
        return acc.concat(updateTopic);
      }
      return acc;
    }, []);
    if (topic_updates.length) {
      saveTopics(topic_updates).then(results => {
        const success = results.reduce((acc, res) => {
          if (!res.success) {
            return false;
          }
          return acc;
        }, true);
        if (success) {
          const topics = this.state.topics.map(t => {
            const { isDirty, ...cleanTopic } = t;
            return cleanTopic;
          });
          // TODO: UX feedback status
          this.setState({
            topics,
            message: {
              show: true,
              error: false,
              text: 'Save Successful',
            },
          });
        } else {
          this.setState({
            message: {
              show: true,
              error: true,
              text: 'save failed - please refresh',
            },
          });
        }
      });
    }
    const sub_updates = this.state.sub_topics.reduce((acc, sub) => {
      if (sub.isDirty) {
        const { isDirty, ...updateSub } = sub;
        return acc.concat(updateSub);
      }
      return acc;
    }, []);
    if (sub_updates.length) {
      saveSubTopics(sub_updates).then(results => {
        const success = results.reduce((acc, res) => {
          if (!res.success) {
            return false;
          }
          return acc;
        }, true);
        if (success) {
          const sub_topics = this.state.sub_topics.map(s => {
            const { isDirty, ...cleanSub } = s;
            return cleanSub;
          });
          this.setState({
            sub_topics,
            message: {
              show: true,
              error: false,
              text: 'Save Successful',
            },
          });
        } else {
          this.setState({
            message: {
              show: true,
              error: true,
              text: 'Save failed - please refresh',
            },
          });
        }
      });
    }
    console.log('topic and subtopic updates:', topic_updates, sub_updates);
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
    console.log('selected topic:', selectedTopic);
    return (
      <Wrapper mobile={mobile}>
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
            <TableHeadWrapper>
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
            </TableHeadWrapper>
            <TableBody>{sub_topic_rows}</TableBody>
          </Table>
        </Paper>
        <ButtonWrapper>
          <Button
            variant="raised"
            color="primary"
            disabled={!isDirty}
            onClick={this.handleSave}
          >
            Save
          </Button>
        </ButtonWrapper>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={message.show}
          onClose={this.handleClose}
          autoHideDuration={message.error ? 3000 : 3000}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={
            <span id="message-id">
              {message.text || 'Something went wrong :('}
            </span>
          }
        />
      </Wrapper>
    );
  }
}
/* eslint-enable camelcase */
