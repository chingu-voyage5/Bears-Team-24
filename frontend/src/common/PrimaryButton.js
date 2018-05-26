import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};
const PrimaryButton = ({ onClick, children }) => (
  <Button variant="raised" color="primary" onClick={onClick}>
    {children}
  </Button>
);

PrimaryButton.propTypes = propTypes;

export default PrimaryButton;
