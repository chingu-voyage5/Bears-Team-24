import React from 'react';
import PropTypes from 'prop-types';
import ContentArea from '../ContentArea';
import Sidebar from '../Sidebar';
import { Wrapper } from './styled';

import checkLocalStorage from './operate';

const CMSContainer = props => {
  // takes data from database into local storage, if empty
  checkLocalStorage();
  const { path } = props.match.params;

  return (
    <Wrapper>
      <Sidebar />
      <ContentArea path={path} />
    </Wrapper>
  );
};

export default CMSContainer;

CMSContainer.propTypes = {
  match: PropTypes.object.isRequired,
};
