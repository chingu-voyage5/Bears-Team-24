import React from 'react';
import PropTypes from 'prop-types';
import ContentArea from '../ContentArea';
import Sidebar from '../Sidebar';
import { Wrapper } from './styled';
import Loading from './Loading';

const CMSContainer = props => {
  const articleId = props.match.params.articleId || '';
  let content = props.cmsReady ? (
    <ContentArea articleId={articleId} />
  ) : (
    <Loading />
  );

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
  cmsReady: PropTypes.bool,
};

CMSContainer.defaultProps = {
  cmsReady: false,
};
