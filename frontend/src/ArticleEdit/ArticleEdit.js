import React from 'react';
import PropTypes from 'prop-types';

import SaveButton from '../common/SaveButton';
import MessageBar from '../common/MessageBar';
import Form from './Form';
import ContentEdit from './ContentEdit';

import { getTopics, getSubTopics } from '../TopicEdit/api';
import actions from './actions';

import { EditorWrapper, Heading1, Wrapper } from './styled';

import { SMALL_WINDOW } from '../config';

/* eslint-disable camelcase */

class ArticleEdit extends React.Component {
  static defaultArticle = {
    title: '',
    topic: null,
    sub_topic: null,
    order: 1,
    content: '',
    edit_lock: false,
  };
  static propTypes = {
    id: PropTypes.string,
    empty: PropTypes.bool,
  };
  static defaultProps = {
    id: '',
    empty: false,
  };

  state = {
    isDirty: false,
    article: { ...ArticleEdit.defaultArticle },
    topics: [],
    sub_topics: [],
    horizontal: 'right',
    vertical: 'top',
    message: { show: false, error: false, text: '' },
  };

  componentDidMount() {
    this.loadData().then(results => {
      const [topics, sub_topics, last] = results;
      let article;
      if (last) {
        article = last;
      } else {
        article = { ...ArticleEdit.defaultArticle, topic: topics[0] };
      }
      let message = { ...this.state.message };
      if (article.edit_lock) {
        message = {
          show: true,
          error: true,
          text: 'Article being edited and cannot be updated',
        };
      }
      this.setState({ topics, sub_topics, article, message });
    });

    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }
  // eslint-disable-next-line react/sort-comp
  loadData() {
    const promises = [];
    promises.push(getTopics());
    promises.push(getSubTopics());
    if (this.props.id) {
      promises.push(actions.get(this.props.id));
    }
    return Promise.all(promises);
  }

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
      isDirty: true,
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
    actions
      .save(this.state.article)
      .then(json => {
        if (json.success) {
          this.setState({
            isDirty: false,
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
    this.setState({ isDirty: true, article });
  };

  render() {
    const { isDirty, message, horizontal, vertical, mobile } = this.state;
    const { empty } = this.props;
    const { topics, sub_topics } = this.state;
    const { article } = this.state;
    // if we have an id but no topics we're not ready
    if ((article.topic === null && !empty) || topics.length === 0) {
      return <div>Loading ...</div>;
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
            canEdit={!article.edit_lock}
          />
          <ContentEdit
            content={article.content || ''}
            handleFieldChange={this.handleFieldChange}
            canEdit={!article.edit_lock}
          />
        </EditorWrapper>
        <div>
          <SaveButton
            disabled={!isDirty || article.edit_lock}
            onClick={this.handleSave}
          >
            Save
          </SaveButton>
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
