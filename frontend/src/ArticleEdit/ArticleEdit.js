import React from 'react';
import marked from 'marked';
import PropTypes from 'prop-types';

import Input from './Input';
import Tab from './Tab';
import { Button, Editor, Heading1, Preview, Textarea, Wrapper } from './styled';

const propTypes = {
  data: PropTypes.shape({
    topic: PropTypes.string,
    content: PropTypes.string,
    sub_topic: PropTypes.array,
    title: PropTypes.string,
  }),
  empty: PropTypes.bool,
};

const defaultProps = {
  data: { topic: '', content: '', sub_topic: [], title: '' },
  empty: false,
};

class ArticleEdit extends React.Component {
  state = {
    edit: true,
    content: this.props.empty ? '' : this.props.data.content,
  };

  handleChange = e => {
    const { edit } = this.state;
    if (e.target.id === 'radio-preview' && edit) {
      this.setState(() => ({ edit: false, content: this.textarea.value }));
    } else if (e.target.id === 'radio-edit' && !edit) {
      this.setState(() => ({ edit: true }));
    }
  };

  handleSave = () => {
    // TEMP
    /* eslint-disable */
    console.log('Title:\n', this.inputTitle.value);
    console.log('Topic:\n', this.inputTopic.value);
    console.log('Sub topic:\n', this.inputSubTopic.value);
    console.log('Content:\n', this.state.content);
    alert('Check console');
    /* eslint-enable */
  };

  render() {
    const { content, edit } = this.state;
    const { data, empty } = this.props;

    return (
      <Wrapper>
        <Heading1>{empty ? 'Create new article' : 'Edit article'}</Heading1>
        <Input
          defaultValue={!empty ? data.title : ''}
          label="Title:"
          name="title"
          innerRef={ref => {
            this.inputTitle = ref;
          }}
        />
        <Input
          defaultValue={!empty ? data.topic : ''}
          label="Topic:"
          name="topic"
          innerRef={ref => {
            this.inputTopic = ref;
          }}
        />
        <Input
          defaultValue={!empty ? data.sub_topic.join(', ') : ''}
          label="Sub topic:"
          name="sub-topic"
          innerRef={ref => {
            this.inputSubTopic = ref;
          }}
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
              innerRef={ref => {
                this.textarea = ref;
              }}
              defaultValue={content}
            />
          ) : (
            <Preview dangerouslySetInnerHTML={{ __html: marked(content) }} />
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
