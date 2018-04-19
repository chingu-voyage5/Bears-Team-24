import React from 'react';
import PropTypes from 'prop-types';

export default class TopicItem extends React.Component {
  static propTypes = {
    indent: PropTypes.string,
    item: PropTypes.object.isRequired,
    orderChange: PropTypes.func.isRequired,
  };
  static defaultProps = {
    indent: '0',
  };
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.props.orderChange(this.props.item, e.target.value);
  }
  render() {
    const { item, indent } = this.props;
    const style = {
      marginLeft: indent ? `${indent}` : '0',
    };
    return (
      <div style={style}>
        {item.name}
        <input value={item.order} onChange={this.onChange} />
      </div>
    );
  }
}
