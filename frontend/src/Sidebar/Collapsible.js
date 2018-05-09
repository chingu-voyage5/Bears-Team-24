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
  static getDerivedStateFromProps(nextProps) {
    console.log('@getDerivedStateFromProps open:', nextProps.open);
    return { open: nextProps.open };
  }
  state = {
    open: false,
  };
  onClick = e => {
    e.stopPropagation();
    const { open } = this.state;
    this.props.expanded(this.props.id, !open);
    this.setState({ open: !open });
  };
  render() {
    const { title, children } = this.props;
    const { open } = this.state;
    return (
      <div style={{cursor: 'default', marginLeft: '1rem'}} onClick={this.onClick}>
        <div>{title}</div>
        {open && children}
      </div>
    );
  }
}
