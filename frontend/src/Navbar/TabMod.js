import React from 'react';
import PropTypes from 'prop-types';

import { Tab } from 'material-ui/Tabs';
import { NavLinkStyled } from './styled';

import paths from './config';

const propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
};

const TabMod = ({ classes, value, ...props }) => (
  <Tab
    style={{ minWidth: '80px' }}
    component={NavLinkStyled}
    disableRipple
    to={paths[value].to}
    label={paths[value].label}
    classes={{ root: classes.fullHeight }}
    value={value}
    {...props}
  />
);

TabMod.propTypes = propTypes;

export default TabMod;
