import React from 'react';
import PropTypes from 'prop-types';

import { SelectWrapper } from './styled';

const propTypes = {
  selectedTopic: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  topicList: PropTypes.array.isRequired,
  canEdit: PropTypes.bool,
};

const defaultProps = {
  canEdit: true,
};

const TopicSelector = ({ selectedTopic, onSelect, topicList, canEdit }) => (
  <SelectWrapper value={selectedTopic} onChange={onSelect} disabled={!canEdit}>
    {topicList}
  </SelectWrapper>
);

TopicSelector.propTypes = propTypes;
TopicSelector.defaultProps = defaultProps;

export default TopicSelector;
