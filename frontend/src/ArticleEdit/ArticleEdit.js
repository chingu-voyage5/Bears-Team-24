import React from 'react';
import marked from 'marked';
import PropTypes from 'prop-types';

// Material-UI components
import MenuItem from 'material-ui/Menu/MenuItem';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import List, { ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';

import ListItemInput from '../ListItemInput';
import TopicSelector from '../TopicEdit/TopicSelector';
import MessageBar from '../common/MessageBar';

import { getTopics, getSubTopics } from '../TopicEdit/api';
import actions from './actions';

import {
  AppBar,
  ContentWrapper,
  EditorWrapper,
  Heading1,
  Preview,
  Textarea,
  Wrapper,
  Label,
} from './styled';

import { SMALL_WINDOW } from '../config';

/* eslint-disable camelcase */

class ArticleEdit extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    empty: PropTypes.bool,
  };
  static nullSubTopic = { _id: '0' };
  static defaultProps = {
    id: '',
    empty: false,
  };

  // FIXME: we only use this to fix a test case, use empty
  static defaultArticle = {
    title: '',
    topic: null,
    sub_topic: null,
    order: 1,
    content: '',
  };

  // static because - eslint-disable class-methods-use-this
  static fetchData(id) {
    return actions.get(id);
  }

  static getAllTopics() {
    return getTopics();
  }
  static getAllSubTopics() {
    return getSubTopics();
  }

  state = {
    edit: 0,
    article: ArticleEdit.defaultArticle,
    topics: [],
    sub_topics: [],
    selectedTopic: null,
    selectedSubTopic: ArticleEdit.nullSubTopic,
    horizontal: 'right',
    vertical: 'top',
    message: { show: false, error: false, text: '' },
  };

  componentDidMount = () => {
    const promises = [];
    promises.push(new Promise(resolve => resolve(ArticleEdit.getAllTopics())));
    promises.push(
      new Promise(resolve => resolve(ArticleEdit.getAllSubTopics()))
    );
    if (this.props.id) {
      promises.push(
        new Promise(resolve => resolve(ArticleEdit.fetchData(this.props.id)))
      );
    }
    Promise.all(promises).then(results => {
      const topics = results[0];
      const sub_topics = results[1];
      let selectedTopic = topics[0];
      let selectedSubTopic = ArticleEdit.nullSubTopic;
      let article = ArticleEdit.defaultArticle;
      if (results.length === 3) {
        // eslint-disable-next-line prefer-destructuring
        article = results[2];
        selectedTopic = topics.reduce((acc, topic) => {
          if (topic._id === article.topic._id) {
            return topic;
          }
          return acc;
        }, null);
        if (article.sub_topic === null) {
          selectedSubTopic = ArticleEdit.nullSubTopic;
        } else {
          selectedSubTopic = sub_topics.reduce((acc, sub) => {
            if (sub._id === article.sub_topic._id) {
              return sub;
            }
            return acc;
          }, ArticleEdit.nullSubTopic);
        }
      }
      this.setState({
        article,
        topics,
        sub_topics,
        selectedTopic,
        selectedSubTopic,
      });
    });

    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState(() => ({
      mobile: window.innerWidth <= SMALL_WINDOW,
    }));
  };

  handleTabSwitch = (e, value) => {
    this.setState(() => ({
      edit: value,
    }));
  };

  handleFieldChange = e => {
    const { message, article } = this.state;
    const na = { ...article };
    switch (e.target.name) {
      case 'topic':
        na.topic = { ...article.topic, name: e.target.value };
        break;
      case 'sub_topic':
        na.sub_topic = { ...article.sub_topic, name: e.target.value };
        break;
      default:
        na[e.target.name] = e.target.value;
        break;
    }
    this.setState({
      message: { ...message, show: false },
      article: na,
    });
  };

  handleSave = () => {
    const { article } = this.state;
    if (article.sub_topic === ArticleEdit.nullSubTopic) {
      delete article.sub_topic;
    }
    actions
      .save(this.state.article)
      .then(json => {
        if (json.success) {
          this.setState({
            message: {
              show: true,
              error: false,
              text: 'Saved Successfully',
            },
            article: { ...article, _id: json._id },
          });
        } else {
          this.setState({
            message: { show: true, error: true, text: json.error },
          });
        }
      })
      .catch(() => {
        this.setState({
          message: {
            show: true,
            error: true,
            text: 'Save Unsuccessful',
          },
        });
      });
  };

  handleClose = () => {
    this.setState(() => ({
      message: { ...this.state.message, show: false },
    }));
  };

  handleTopicSelect = e => {
    const { article } = this.state;
    article.topic = e.target.value;
    const selectedTopic = this.state.topics.reduce((acc, topic) => {
      if (topic._id === e.target.value) {
        return topic;
      }
      return acc;
    }, {});
    const selectedSubTopic = ArticleEdit.nullSubTopic;
    this.setState({ article, selectedTopic, selectedSubTopic });
  };

  handleSubTopicSelect = e => {
    const { article } = this.state;
    article.sub_topic = e.target.value;
    const selectedSubTopic = this.state.sub_topics.reduce((acc, sub) => {
      if (sub._id === e.target.value) {
        return sub;
      }
      return acc;
    }, ArticleEdit.nullSubTopic);
    this.setState({ article, selectedSubTopic });
  };

  render() {
    const { edit, message, horizontal, vertical, mobile } = this.state;
    const { empty } = this.props;
    const { topics, sub_topics, selectedTopic, selectedSubTopic } = this.state;
    let { article } = this.state;
    // if we have an id but no topics we're not ready
    if (
      (selectedTopic === null && !empty) ||
      (topics.length === 0 || sub_topics.length === 0)
    ) {
      return <div>Loading ...</div>;
    }
    // FIXME: we have an issue with test, last render called with null article
    // This doesn't seem to happen running the app
    if (!article) {
      article = ArticleEdit.defaultArticle;
    }
    const topicList = this.state.topics.map(topic => (
      <MenuItem key={topic._id} value={topic._id}>
        {topic.name}
      </MenuItem>
    ));
    const subTopicList = this.state.sub_topics.reduce((acc, sub) => {
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
    return (
      <Wrapper mobile={mobile}>
        <EditorWrapper>
          <Heading1>{empty ? 'Create new article' : 'Edit article'}</Heading1>
          <List>
            <ListItemInput
              mobile={mobile}
              label="Title"
              name="title"
              value={article.title || ''}
              onChange={this.handleFieldChange}
            />
            <ListItemInput
              mobile={mobile}
              label="Order"
              name="order"
              value={`${article.order || 0}`}
              onChange={this.handleFieldChange}
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
                selectedTopic={selectedSubTopic._id}
                onSelect={this.handleSubTopicSelect}
                topicList={subTopicList}
              />
            </ListItem>
          </List>
          <ContentWrapper>
            <AppBar position="static">
              <Tabs
                value={edit}
                onChange={this.handleTabSwitch}
                indicatorColor="secondary"
                fullWidth={false}
              >
                <Tab disableRipple label="Markdown" />
                <Tab disableRipple label="Preview" />
              </Tabs>
            </AppBar>
            {!edit ? (
              <Paper>
                <Textarea
                  placeholder="Markdown flavored content here..."
                  multiline
                  name="content"
                  value={article.content}
                  onChange={this.handleFieldChange}
                />
              </Paper>
            ) : (
              <Preview
                dangerouslySetInnerHTML={{ __html: marked(article.content) }}
              />
            )}
          </ContentWrapper>
        </EditorWrapper>
        <div>
          <Button variant="raised" color="primary" onClick={this.handleSave}>
            Save
          </Button>
        </div>
        <MessageBar
          anchor={{ vertical, horizontal }}
          message={message}
          handleClose={this.handleClose}
        />
      </Wrapper>
    );
  }
}

export default ArticleEdit;
