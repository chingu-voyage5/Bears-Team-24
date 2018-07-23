import React from 'react';
import PropTypes from 'prop-types';
import removeMd from 'remove-markdown';

import { Card, Highlight, Path, Snippet, Title, Wrapper } from './styled';

import { fixPath, getIndexes, stayPositive } from './utils';

// how many characters surround highlighted search string
const charsAround = 100;

const propTypes = {
  onClick: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired,
};

const SearchResults = ({ onClick, query, results }) => (
  <Wrapper>
    {results.map(res => {
      const content = removeMd(res.content);
      const idxs = getIndexes(content, query);

      return (
        !!idxs.length && (
          <Card key={res._id} onClick={() => onClick(res._id)}>
            <Title>{res.title}</Title>
            <Path>
              {res.topic.name} &gt;{' '}
              {res.sub_topic && fixPath(res.sub_topic.name)}
            </Path>
            <div>
              {idxs.map(idx => (
                <Snippet key={idx}>
                  {idx > charsAround && '...'}
                  {content.substr(
                    stayPositive(idx, charsAround),
                    idx < charsAround ? idx : charsAround
                  )}
                  <Highlight>{content.substr(idx, query.length)}</Highlight>
                  {content.substr(idx + query.length, charsAround)}...
                </Snippet>
              ))}
            </div>
          </Card>
        )
      );
    })}
  </Wrapper>
);

SearchResults.propTypes = propTypes;

export default SearchResults;
