import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';

import PrimaryButton from '../common/PrimaryButton';
import MessageBar from '../common/MessageBar';

import actions from './actions';

import { Heading1, Wrapper, ButtonWrapper, DiffWrapper, Label } from './styled';

// import { SMALL_WINDOW } from '../config';

/* eslint-disable camelcase */

export default class ArticleChangeEdit extends React.Component {
  static propTypes = {
    id: PropTypes.string,
  };
  static defaultProps = {
    id: '',
  };

  state = {
    changeRequest: [],
    horizontal: 'right',
    vertical: 'top',
    message: { show: false, error: false, text: '' },
  };

  componentDidMount() {
    this.fetchData(this.props.id).then(results => {
      this.setState({ changeRequest: results });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  fetchData(article_id) {
    return actions.getArticleChangeRequest(article_id);
  }

  handleSave = e => {
    const id = this.state.changeRequest[0]._id;
    const accept = e.target.name === 'accept';
    actions
      .saveArticleChangeRequest({ id, accept })
      .then(json => {
        console.log('redirect to change list?', json);
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
    const { message, horizontal, vertical, mobile } = this.state;
    const { changeRequest } = this.state;
    // if we have an id but no topics we're not ready
    if (changeRequest.length === 0) {
      return <div>Loading ...</div>;
    }
    const { article } = changeRequest[0];
    return (
      <Wrapper mobile={mobile}>
        <Heading1>Content Moderation</Heading1>
        <List>
          <ListItem>
            <Label>
              <Typography variant="title">Title:</Typography>
            </Label>
            <Label>
              <Typography variant="subheading">{article.title}</Typography>
            </Label>
          </ListItem>
          <ListItem>
            <Label>
              <Typography variant="title">Topic:</Typography>
            </Label>
            <Label>
              <Typography variant="subheading">{article.topic.name}</Typography>
            </Label>
          </ListItem>
          <ListItem>
            <Label>
              <Typography variant="title">Sub Topic:</Typography>
            </Label>
            <Label>
              <Typography variant="subheading">
                {article.sub_topic.name}
              </Typography>
            </Label>
          </ListItem>
        </List>
        <DiffWrapper>
          <Paper>
            {changeRequest[0].diff.map((part, ndx) => {
              const style = {
                // eslint-disable-next-line no-nested-ternary
                color: part.added ? 'green' : part.removed ? 'red' : 'grey',
              };
              return (
                // eslint-disable-next-line react/no-array-index-key
                <span key={ndx} style={style}>
                  {part.value}
                </span>
              );
            })}
          </Paper>
        </DiffWrapper>
        <ButtonWrapper>
          <PrimaryButton name="accept" onClick={this.handleSave}>
            Accept
          </PrimaryButton>
          <PrimaryButton name="reject" onClick={this.handleSave}>
            Reject
          </PrimaryButton>
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
