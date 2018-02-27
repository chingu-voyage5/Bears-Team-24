import React from 'react';
import PropTypes from 'prop-types';

import { Field, Label } from './styled';

const propTypes = {
  autofocus: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string,
};

const defaultProps = {
  autofocus: false,
  disabled: false,
  label: null,
  onChange: noop => noop,
  type: 'text',
  value: '',
};

const Input = ({ autofocus, disabled, label, name, onChange, type, value }) => (
  <Label htmlFor={name}>
    {label}
    <Field
      autoFocus={autofocus}
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  </Label>
);

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
