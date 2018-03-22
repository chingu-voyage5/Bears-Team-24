import React from 'react';
import PropTypes from 'prop-types';

import { Tab } from 'material-ui/Tabs';
import { NavLinkStyled } from './styled';

import paths from './config';

const propTypes = {
  classes: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
};

const TabMod = ({ classes, idx, ...props }) => (
  <Tab
    component={NavLinkStyled}
    disableRipple
    key={idx}
    to={paths[idx].to}
    label={paths[idx].label}
    classes={{ root: classes.fullHeight }}
    {...props}
  />
);

TabMod.propTypes = propTypes;

export default TabMod;
