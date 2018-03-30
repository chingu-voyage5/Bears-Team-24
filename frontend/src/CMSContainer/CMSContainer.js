import React from 'react';
import PropTypes from 'prop-types';
import ContentArea from '../ContentArea';
import Sidebar from '../Sidebar';
import { Wrapper } from './styled';

const CMSContainer = props => {
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
