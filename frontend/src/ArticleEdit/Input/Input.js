import React from 'react';
import PropTypes from 'prop-types';

import { InputField, Label } from './styled';

const propTypes = {
  defaultValue: PropTypes.string.isRequired,
  innerRef: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const Input = ({ defaultValue, innerRef, label, name }) => (
  <Label htmlFor={name}>
    {label}
    <InputField id={name} innerRef={innerRef} defaultValue={defaultValue} />
  </Label>
);

Input.propTypes = propTypes;

export default Input;
