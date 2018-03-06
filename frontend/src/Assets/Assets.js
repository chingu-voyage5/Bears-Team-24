import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';

import { Button, Wrapper } from './styled';

import data from './MOCK_DATA.json';
import '../react-table.css';

import columns from './columns_config';

const propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

class Assets extends React.Component {
  handleClick = () => {
    this.props.history.push(`${this.props.location.pathname}/new`);
  };

  handleNavigation = id => {
    this.props.history.push(`${this.props.location.pathname}/${id}`);
  };

  render() {
    return (
      <Wrapper>
        <Button onClick={this.handleClick}>New Asset</Button>
        <ReactTable
          data={data}
          columns={columns}
          className="-striped -highlight"
          getTdProps={(_, rowInfo) => ({
            onClick: () => this.handleNavigation(rowInfo.row._id),
          })}
        />
      </Wrapper>
    );
  }
}

Assets.propTypes = propTypes;

export default Assets;
