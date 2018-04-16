import React from 'react';
import marked from 'marked';
import PropTypes from 'prop-types';

// Material-UI components
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import Tabs, { Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';

import actions from './actions';

import {
  AppBar,
  ContentWrapper,
  EditorWrapper,
  Heading1,
  Label,
  Preview,
  Textarea,
  Wrapper,
} from './styled';

const propTypes = {
  id: PropTypes.string,
  empty: PropTypes.bool,
};

const defaultProps = {
  id: '',
  empty: false,
};

class ArticleEdit extends React.Component {
  state = {
    edit: 0,
    article: {
      title: '',
      topic: { name: '' },
      sub_topic: { name: '' },
    },
    horizontal: 'right',
    vertical: 'top',
    message: { show: false, error: false, text: '' },
  };

  componentDidMount = () => {
    if (this.props.id) {
      actions
        .get(this.props.id)
        .then(article => this.setState({ article }))
        // eslint-disable-next-line no-console
        .catch(e => console.error('get article for edit failed:', e));
    }
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
      message: { show: false },
    }));
  };

  render() {
    const { edit, article, message, horizontal, vertical } = this.state;
    const { empty } = this.props;

    return (
      <Wrapper>
        <EditorWrapper>
          <Heading1>{empty ? 'Create new article' : 'Edit article'}</Heading1>
          <List>
            <ListItem>
              <Label>Title:</Label>
              <ListItemText>
                <TextField
                  fullWidth
                  value={article.title}
                  name="title"
                  onChange={this.handleFieldChange}
                />
              </ListItemText>
            </ListItem>
            <ListItem>
              <Label>Topic:</Label>
              <ListItemText>
                <TextField
                  fullWidth
                  value={article.topic.name}
                  name="topic"
                  onChange={this.handleFieldChange}
                />
              </ListItemText>
            </ListItem>
            <ListItem>
              <Label>Sub topic:</Label>
              <ListItemText>
                <TextField
                  fullWidth
                  value={article.sub_topic.name}
                  name="sub_topic"
                  onChange={this.handleFieldChange}
                />
              </ListItemText>
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
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={message.show}
          onClose={this.handleClose}
          autoHideDuration={message.error ? null : 3000}
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

ArticleEdit.propTypes = propTypes;
ArticleEdit.defaultProps = defaultProps;

export default ArticleEdit;
