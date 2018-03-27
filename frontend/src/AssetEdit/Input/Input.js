import React from 'react';
import PropTypes from 'prop-types';

import { InputField, Label } from './styled';

const propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const Input = ({ value, label, name, onChange }) => (
  <Label htmlFor={name}>
    {label}
    <InputField name={name} value={value} onChange={onChange} />
  </Label>
);

Input.propTypes = propTypes;

export default Input;
