import React from 'react';
import PropTypes from 'prop-types';

import { SelectWrapper } from './styled';

const propTypes = {
  selectedTopic: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  topicList: PropTypes.array.isRequired,
};

const TopicSelector = ({ selectedTopic, onSelect, topicList }) => (
  <SelectWrapper value={selectedTopic} onChange={onSelect}>
    {topicList}
  </SelectWrapper>
);

TopicSelector.propTypes = propTypes;

export default TopicSelector;
