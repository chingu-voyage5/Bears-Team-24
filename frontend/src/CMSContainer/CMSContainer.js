import React from 'react';
import PropTypes from 'prop-types';
import ContentArea from '../ContentArea';
import Sidebar from '../Sidebar';
import { Wrapper } from './styled';
import Loading from './Loading';

const CMSContainer = props => {
  const path = props.match.params.path || '';
	let content = <Loading />;	
	if(props.cmsReady){
		content = <ContentArea path={path} />
	}
  return (
    <Wrapper>
      <Sidebar />
      {content}
    </Wrapper>
  );
};

export default CMSContainer;

CMSContainer.propTypes = {
  match: PropTypes.object.isRequired,
};
