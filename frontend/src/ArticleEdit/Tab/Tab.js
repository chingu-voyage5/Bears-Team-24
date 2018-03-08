import React from 'react';
import PropTypes from 'prop-types';

import { Label, Radio } from './styled';

const propTypes = {
  active: PropTypes.bool.isRequired,
  gridArea: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const Tab = ({ active, gridArea, handleClick, label, name }) => (
  <Label htmlFor={name} active={active} gridArea={gridArea}>
    {label}
    <Radio id={name} onClick={handleClick} defaultChecked={active} />
  </Label>
);

Tab.propTypes = propTypes;

export default Tab;
