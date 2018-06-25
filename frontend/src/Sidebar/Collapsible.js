import React from 'react';
import PropTypes from 'prop-types';

import { Details, Summary } from './styled';

export default class Collapsible extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
      .isRequired,
    title: PropTypes.string.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    open: PropTypes.bool.isRequired,
    expanded: PropTypes.func.isRequired,
  };
  // eslint-disable-next-line
  state = {
    open: false,
  };
  static getDerivedStateFromProps(nextProps) {
    return { open: nextProps.open };
  }
  onClick = e => {
    e.stopPropagation();
    const { open } = this.state;
    this.props.expanded(this.props.id, !open);
    this.setState({ open: !open });
  };
  render() {
    const { title, children } = this.props;
    const { open } = this.state;
    const rightArrow = String.fromCharCode(9658);
    const downArrow = String.fromCharCode(9660);
    return (
      <Details>
        <Summary onClick={this.onClick}>
          {open ? downArrow : rightArrow} {title}
        </Summary>
        {open && children}
      </Details>
    );
  }
}
