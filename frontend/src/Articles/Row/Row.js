import React from 'react';
import PropTypes from 'prop-types';

import { Creator, Title } from './styled';

const propTypes = {
  title: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
};

const dataNames = { title: 'title', creator: 'creator' };

const Row = ({ title, creator }) => (
  <React.Fragment>
    <Title data-name={dataNames.title} title="Click to edit">
      {title}
    </Title>
    <Creator data-name={dataNames.creator}>{creator}</Creator>
  </React.Fragment>
);

Row.propTypes = propTypes;

export default Row;

export { dataNames };
