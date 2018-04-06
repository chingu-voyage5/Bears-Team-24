import React from 'react';
import PropTypes from 'prop-types';
import ContentArea from '../ContentArea';
import Sidebar from '../Sidebar';
import { Wrapper } from './styled';
import Loading from './Loading';

const CMSContainer = props => {
  const articleId = props.match.params.articleId || '';
  const articleIndex = props.articleIndex;
  let content = props.cmsReady ? (
    <ContentArea articles={props.articles} articleId={articleId} articleIndex={articleIndex} />
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
