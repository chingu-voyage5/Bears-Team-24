import React from 'react';
import PropTypes from 'prop-types';

import Row, { dataNames } from './Row';
import {
  Button,
  RowWrapper,
  Separator,
  TitleRowWrapper,
  Wrapper,
} from './styled';

import data from './MOCK_DATA.json';

const propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

const renderRows = (arr, onClick) =>
  arr.map(d => (
    <RowWrapper
      href={`pages/${d._id}`}
      key={d._id}
      onClick={e => onClick(e, d._id)}
    >
      <Row title={d.content} creator={d.creator} />
    </RowWrapper>
  ));

class Articles extends React.Component {
  handleClick = (e, id) => {
    e.preventDefault();
    const { name } = e.target.dataset;
    if (name === dataNames.title) {
      this.props.history.push(`${this.props.location.pathname}/${id}`);
    } else if (name === dataNames.creator) {
      // eslint-disable-next-line
      alert('Creator clicked');
    }
  };

  handleNewPage = () => {
    this.props.history.push(`${this.props.location.pathname}/new`);
  };

  render() {
    return (
      <Wrapper>
        <Button onClick={this.handleNewPage}>New Page</Button>
        <TitleRowWrapper>
          <Row title="Title" creator="Owner" />
        </TitleRowWrapper>
        <Separator />
        {renderRows(data, this.handleClick)}
      </Wrapper>
    );
  }
}

Articles.propTypes = propTypes;

export default Articles;
