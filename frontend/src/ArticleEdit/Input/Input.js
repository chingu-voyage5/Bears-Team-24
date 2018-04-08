import React from 'react';
import PropTypes from 'prop-types';

import { InputField, Label } from './styled';

const propTypes = {
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
const defaultProps = {
  value: '',
};

const Input = ({ value, label, name, onChange }) => (
  <Label htmlFor={name}>
    {label}
    <InputField id={name} name={name} value={value} onChange={onChange} />
  </Label>
);

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
