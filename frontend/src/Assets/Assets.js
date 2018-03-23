import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import actions from './actions';

import { Button, Wrapper } from './styled';

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
  state = {
    data: [],
  };
  componentDidMount = () => {
    actions.getAll().then(data => {
      this.setState({ data });
    });
  };
  handleClick = () => {
    this.props.history.push(`${this.props.location.pathname}/new`);
  };

  handleNavigation = id => {
    this.props.history.push(`${this.props.location.pathname}/${id}`);
  };

  render() {
    const { data } = this.state;
    return (
      <Wrapper>
        <Button onClick={this.handleClick}>New Asset</Button>
        <ReactTable
          data={data}
          columns={columns}
          noDataText="No data found."
          className={data.length ? '-striped -highlight' : ''}
          getTdProps={(_, rowInfo) => ({
            onClick: () => {
              if (rowInfo) {
                this.handleNavigation(rowInfo.row._id);
              }
            },
          })}
        />
      </Wrapper>
    );
  }
}

Assets.propTypes = propTypes;

export default Assets;
