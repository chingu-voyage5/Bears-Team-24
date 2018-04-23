import React from 'react';
import PropTypes from 'prop-types';

import { Details } from './styled';

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
};

const Collapsible = ({ title, children, open }) => (
  <Details open={open}>
    <summary>{title}</summary>
    {children}
  </Details>
);

Collapsible.propTypes = propTypes;

export default Collapsible;
