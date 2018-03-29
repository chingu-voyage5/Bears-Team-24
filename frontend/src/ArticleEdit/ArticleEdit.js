import React from 'react';
import marked from 'marked';
import PropTypes from 'prop-types';

import actions from './actions';

import Input from './Input';
import Tab from './Tab';
import { Button, Editor, Heading1, Preview, Textarea, Wrapper } from './styled';

const propTypes = {
  id: PropTypes.string,
  empty: PropTypes.bool,
};

const defaultProps = {
  id: '0',
  empty: false,
};

class ArticleEdit extends React.Component {
  state = {
    edit: true,
    article: {},
  };

  componentDidMount = () => {
    if (this.props.id && this.props.id !== '0') {
      actions.get(this.props.id).then(article => this.setState({ article }));
    }
  };

  handleChange = e => {
    const { edit } = this.state;
    if (e.target.id === 'radio-preview' && edit) {
      this.setState(() => ({
        edit: false,
        article: {
          ...this.state.article,
          content: this.state.article.content,
        },
      }));
    } else if (e.target.id === 'radio-edit' && !edit) {
      this.setState(() => ({ edit: true }));
    }
  };

  handleFieldChange = e => {
    this.setState({
      article: {
        ...this.state.article,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSave = () => {
    const { article } = this.state;
    actions.save(article).then(json => {
      if (json.success) {
        this.setState({
          article: { ...article, _id: json._id },
        });
      } else {
        console.error('article save failed:', json.error);
      }
    });
  };

  render() {
    const { edit, article } = this.state;
    const { empty } = this.props;

    return (
      <Wrapper>
        <Heading1>{empty ? 'Create new article' : 'Edit article'}</Heading1>
        <Input
          value={article.title}
          label="Title:"
          name="title"
          onChange={this.handleFieldChange}
        />
        <Input
          value={article.topic}
          label="Topic:"
          name="topic"
          onChange={this.handleFieldChange}
        />
        <Input
          value={article.sub_topic}
          label="Sub topic:"
          name="sub_topic"
          onChange={this.handleFieldChange}
        />
        <Editor>
          <Tab
            active={this.state.edit}
            gridArea="markdown"
            handleClick={this.handleChange}
            label="Markdown"
            name="radio-edit"
          />
          <Tab
            active={!this.state.edit}
            gridArea="preview"
            handleClick={this.handleChange}
            label="Preview"
            name="radio-preview"
          />
          {edit ? (
            <Textarea
              name="content"
              value={article.content}
              onChange={this.handleFieldChange}
            />
          ) : (
            <Preview
              dangerouslySetInnerHTML={{ __html: marked(article.content) }}
            />
          )}
        </Editor>
        <Button onClick={this.handleSave}>Save</Button>
      </Wrapper>
    );
  }
}

ArticleEdit.propTypes = propTypes;
ArticleEdit.defaultProps = defaultProps;

export default ArticleEdit;
