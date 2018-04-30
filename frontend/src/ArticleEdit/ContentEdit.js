import React from 'react';
import PropTypes from 'prop-types';

import marked from 'marked';

import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';

import { AppBar, ContentWrapper, Preview, Textarea } from './styled';

export default class ContentEdit extends React.Component {
  static propTypes = {
    edit: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    handleFieldChange: PropTypes.func.isRequired,
  };

  handleTabSwitch = (e, value) => {
    this.setState(() => ({
      edit: value,
    }));
  };

  render = () => {
    const { content, edit, handleFieldChange } = this.props;
    return (
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
              value={content}
              onChange={handleFieldChange}
            />
          </Paper>
        ) : (
          <Preview
            dangerouslySetInnerHTML={{
              __html: marked(content || ''),
            }}
          />
        )}
      </ContentWrapper>
    );
  };
}
