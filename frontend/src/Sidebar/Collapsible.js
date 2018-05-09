import React from 'react';
import PropTypes from 'prop-types';

import { Details, Summary } from './styled';

export default class Collapsible extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
      .isRequired,
    title: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    expanded: PropTypes.func.isRequired,
  };
  onClick = () => {
    this.props.expanded(this.props.id, !this.props.open);
  };
  render() {
    const { title, children, open } = this.props;
    return (
      <Details open={open} onClick={this.onClick}>
        <Summary>{title}</Summary>
        {children}
      </Details>
    );
  }
}
