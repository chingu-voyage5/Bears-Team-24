import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  name: PropTypes.string,
};
const defaultProps = {
  name: 'unknown',
};
const PrimaryButton = ({ onClick, name, children }) => (
  <Button variant="raised" color="primary" name={name} onClick={onClick}>
    {children}
  </Button>
);

PrimaryButton.propTypes = propTypes;
PrimaryButton.defaultProps = defaultProps;

export default PrimaryButton;
