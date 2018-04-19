import React from 'react';
import PropTypes from 'prop-types';

export default class TopicItem extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    orderChange: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.props.orderChange(this.props.item, e.target.value);
  }
  render() {
    const { item } = this.props;
    return (
      <div>
        {`${item.topic.name} : ${item.sub_topic.name}`}
        <input value={item.sub_topic.order} onChange={this.onChange} />
      </div>
    );
  }
}
