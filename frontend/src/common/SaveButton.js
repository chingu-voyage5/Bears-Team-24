import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

const propTypes = {
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const SaveButton = ({ disabled, onClick }) => (
  <Button
    variant="raised"
    color="primary"
    disabled={disabled}
    onClick={onClick}
  >
    Save
  </Button>
);

SaveButton.propTypes = propTypes;

export default SaveButton;
