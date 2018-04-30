import React from 'react';
import PropTypes from 'prop-types';

// Material-UI components
import Button from 'material-ui/Button';

import MessageBar from '../common/MessageBar';
import Form from './Form';
import ContentEdit from './ContentEdit';

import handleResponse from '../common/ErrorHandler';
import { getTopics, getSubTopics } from '../TopicEdit/api';
import actions from './actions';

import { EditorWrapper, Heading1, Wrapper } from './styled';

import { SMALL_WINDOW } from '../config';

/* eslint-disable camelcase */

class ArticleEdit extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    empty: PropTypes.bool,
  };
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

  state = {
    edit: 0,
    article: { ...ArticleEdit.defaultArticle },
    topics: [],
    sub_topics: [],
    horizontal: 'right',
    vertical: 'top',
    message: { show: false, error: false, text: '' },
  };

  componentDidMount = () => {
    const promises = [];
    promises.push(
      new Promise(resolve => resolve(getTopics().then(handleResponse)))
    );
    promises.push(
      new Promise(resolve => resolve(getSubTopics().then(handleResponse)))
    );
    if (this.props.id) {
      promises.push(
        new Promise(resolve =>
          resolve(actions.get(this.props.id).then(handleResponse))
        )
      );
    }
    Promise.all(promises).then(results => {
      const topics = results[0];
      const sub_topics = results[1];
      let article = { ...ArticleEdit.defaultArticle };
      if (results.length === 3) {
        // eslint-disable-next-line prefer-destructuring
        article = results[2];
      } else {
        [article.topic] = topics;
      }
      this.setState({
        article,
        topics,
        sub_topics,
      });
    });

    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  // eslint-disable-next-line react/sort-comp
  handleResize = () => {
    this.setState(() => ({
      mobile: window.innerWidth <= SMALL_WINDOW,
    }));
  };

  handleFieldChange = e => {
    const { name, value } = e.target;
    const { message, article } = this.state;
    article[name] = value;
    this.setState({
      message: { ...message, show: false },
      article,
    });
  };

  validateArticle = article => {
    let message = '';
    if (!article.title) {
      message = 'Please enter a title';
    }
    if (!article.topic) {
      message = 'Please enter a topic';
    }
    if (!article.content) {
      message = 'Please enter some content';
    }
    return { success: !message, message };
  };

  handleSave = () => {
    const { article } = this.state;
    const valid = this.validateArticle(article);
    if (valid.success === false) {
      this.setState({
        message: {
          show: true,
          error: true,
          text: valid.message,
        },
      });
      return;
    }
    // FIXME: remove
    // if (article.sub_topic === ArticleEdit.nullSubTopic) {
    //   delete article.sub_topic;
    // }
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

  setTopics = (selectedTopic, selectedSubTopic) => {
    const { article } = this.state;
    article.topic = selectedTopic;
    article.sub_topic = selectedSubTopic;
    this.setState({ article });
  };

  render() {
    const { edit, message, horizontal, vertical, mobile } = this.state;
    const { empty } = this.props;
    const { topics, sub_topics } = this.state;
    let { article } = this.state;
    // if we have an id but no topics we're not ready
    if ((article.topic === null && !empty) || topics.length === 0) {
      return <div>Loading ...</div>;
    }
    // FIXME: we have an issue with test, last render called with null article
    // This doesn't seem to happen running the app
    if (!article) {
      article = { ...ArticleEdit.defaultArticle };
    }
    return (
      <Wrapper mobile={mobile}>
        <EditorWrapper>
          <Heading1>{empty ? 'Create new article' : 'Edit article'}</Heading1>
          <Form
            mobile={mobile}
            title={article.title || ''}
            order={`${article.order}` || '0'}
            handleFieldChange={this.handleFieldChange}
            topics={topics}
            sub_topics={sub_topics}
            selectedTopic={article.topic}
            selectedSubTopic={article.sub_topic}
            setTopics={this.setTopics}
          />
          <ContentEdit
            edit={edit}
            content={article.content || ''}
            handleFieldChange={this.handleFieldChange}
          />
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
