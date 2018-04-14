import React from 'react';
import PropTypes from 'prop-types';
import ContentArea from '../ContentArea';
import Sidebar from '../Sidebar';
import { Wrapper } from './styled';
import Loading from './Loading';

const CMSContainer = props => {
  const articleId = props.match.params.articleId || '';
  const { articleIndex } = props;
  return (
    <Wrapper>
      <Sidebar articles={props.articles} />
      {props.cmsReady ? (
        <ContentArea
          articles={props.articles}
          articleId={articleId}
          articleIndex={articleIndex}
        />
      ) : (
        <Loading />
      )}
    </Wrapper>
  );
};

export default CMSContainer;

CMSContainer.propTypes = {
  match: PropTypes.object.isRequired,
  cmsReady: PropTypes.bool,
  articleIndex: PropTypes.object,
  articles: PropTypes.array,
};

CMSContainer.defaultProps = {
  cmsReady: false,
  articleIndex: {},
  articles: [],
};
