import React from 'react';
import marked from 'marked';
import PropTypes from 'prop-types';

// Material-UI components
import Button from 'material-ui/Button';
import List from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';

import ListItemInput from '../ListItemInput';
import MessageBar from '../common/MessageBar';

import actions from './actions';

import {
  AppBar,
  ContentWrapper,
  EditorWrapper,
  Heading1,
  Preview,
  Textarea,
  Wrapper,
} from './styled';

import { SMALL_WINDOW } from '../config';

class ArticleEdit extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    empty: PropTypes.bool,
  };

  static defaultProps = {
    id: '',
    empty: false,
  };

  static defaultArticle = {
    title: '',
    topic: { name: '' },
    sub_topic: { name: '' },
    order: 1,
    content: '',
  };

  state = {
    edit: 0,
    article: ArticleEdit.defaultArticle,
    horizontal: 'right',
    vertical: 'top',
    message: { show: false, error: false, text: '' },
  };

  componentDidMount = () => {
    console.log('article edit mounted props:', this.props.id);
    if (this.props.id) {
      actions
        .get(this.props.id)
        .then(article => this.setState({ article }))
        // eslint-disable-next-line no-console
        .catch(e => console.error('get article for edit failed:', e));
    }

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

  // eslint-disable-next-line
  fetchData(id) {
    return actions.get(id);
  }

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
    actions
      .save(this.state.article)
      .then(json => {
        if (json.success) {
          this.setState(({ article }) => ({
            message: {
              show: true,
              error: false,
              text: 'Saved Successfully',
            },
            article: { ...article, _id: json._id },
          }));
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

  render() {
    const { edit, message, horizontal, vertical, mobile } = this.state;
    let { article } = this.state;
    const { empty } = this.props;
    if (!article) {
      console.error('render article is null and props:', this.props);
      article = ArticleEdit.defaultArticle;
    }
console.log('article edit render:', article);
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
            <ListItemInput
              mobile={mobile}
              label="Topic"
              name="topic"
              value={empty ? '' : article.topic.name || ''}
              onChange={this.handleFieldChange}
            />
            <ListItemInput
              mobile={mobile}
              label="Sub Topic"
              name="sub_topic"
              value={empty ? '' : article.sub_topic.name || ''}
              onChange={this.handleFieldChange}
            />
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
