import React from 'react';
import PropTypes from 'prop-types';

import { Creator, Title } from './styled';

const propTypes = {
  topic: PropTypes.string.isRequired,
  subTopic: PropTypes.string,
  title: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
};

const defaultProps = {
  subTopic: '',
};

const dataNames = {
  topic: 'topic',
  subTopic: 'subTopic',
  title: 'title',
  creator: 'creator',
};

const Row = ({ topic, subTopic, title, creator }) => (
  <React.Fragment>
    <Title data-names={dataNames.topic} title="Topic">
      {topic}
    </Title>
    <Title data-names={dataNames.subTopic} title="SubTopic">
      {subTopic}
    </Title>
    <Title data-name={dataNames.title} title="Click to edit">
      {title}
    </Title>
    <Creator data-name={dataNames.creator}>{creator}</Creator>
  </React.Fragment>
);

Row.propTypes = propTypes;
Row.defaultProps = defaultProps;

export default Row;

export { dataNames };
