import React from 'react';
import marked from 'marked';
import PropTypes from 'prop-types';

import Input from './Input';
import Tab from './Tab';
import { Button, Editor, Heading1, Preview, Textarea, Wrapper } from './styled';

const propTypes = {
  data: PropTypes.shape({
    category: PropTypes.string,
    content: PropTypes.string,
    sub_category: PropTypes.array,
    title: PropTypes.string,
  }),
  empty: PropTypes.bool,
};

const defaultProps = {
  data: { category: '', content: '', sub_category: [], title: '' },
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
    console.log('Category:\n', this.inputCategory.value);
    console.log('Sub category:\n', this.inputSubCategory.value);
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
          defaultValue={!empty ? data.category : ''}
          label="Category:"
          name="category"
          innerRef={ref => {
            this.inputCategory = ref;
          }}
        />
        <Input
          defaultValue={!empty ? data.sub_category.join(', ') : ''}
          label="Sub category:"
          name="sub-category"
          innerRef={ref => {
            this.inputSubCategory = ref;
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
