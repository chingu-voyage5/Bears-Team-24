import React from 'react';
import PropTypes from 'prop-types';
import ContentArea from '../ContentArea';
import Sidebar from '../Sidebar';
import { Wrapper } from './styled';

const CMSContainer = props => {
  const { path } = props.match.params;
	let content = 'loading';	
	console.log(props.cmsReady);
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
