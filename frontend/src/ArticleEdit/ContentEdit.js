import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import MarkdownParser from '../common/MarkdownParser';

import { AppBar, ContentWrapper, Preview, Textarea } from './styled';

export default class ContentEdit extends React.Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    handleFieldChange: PropTypes.func.isRequired,
    canEdit: PropTypes.bool,
  };
  static defaultProps = {
    canEdit: true,
  };
  state = { edit: 0 };

  handleTabSwitch = (e, value) => {
    this.setState(() => ({
      edit: value,
    }));
  };

  render = () => {
    const { content, handleFieldChange, canEdit } = this.props;
    const { edit } = this.state;
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
              disabled={!canEdit}
            />
          </Paper>
        ) : (
          <Preview>
            <MarkdownParser content={content || ''} />
          </Preview>
        )}
      </ContentWrapper>
    );
  };
}
