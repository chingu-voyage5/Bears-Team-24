import React from 'react';
import PropTypes from 'prop-types';

// Material UI components
import Button from 'material-ui/Button';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableSortLabel,
} from 'material-ui/Table';

import actions from './actions';
import {
  ButtonWrapper,
  LinkCell,
  TableRow,
  TableWrapper,
  Wrapper,
} from './styled';

const CREATOR = 'creator';
const CREATED = 'created';

const columnData = [
  { id: 'content_type', numeric: false, label: 'Type' },
  { id: CREATOR, numeric: false, label: 'Owner' },
  { id: 'title', numeric: false, label: 'Title' },
  { id: 'created', numeric: false, label: 'Date created' },
];

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
    order: 'asc',
  };

  componentDidMount = () => {
    this.fetchData()
      .then(data => this.setState({ data }))
      // eslint-disable-next-line
      .catch(err => console.log(err));
  };

  // eslint-disable-next-line
  fetchData() {
    return actions.getAll();
  }

  handleClick = (e, assetId, creatorId) => {
    e.preventDefault();

    const { name } = e.target.dataset;

    if (name === CREATOR) {
      this.props.history.push(`/users/${creatorId}`);
    } else {
      this.props.history.push(`${this.props.location.pathname}/${assetId}`);
    }
  };

  handleSort = id => {
    const { data, sortedBy } = this.state;
    let { order } = this.state;

    if (id !== sortedBy) {
      order = 'desc';
    }

    if (id === CREATOR) {
      data.sort((a, b) => {
        if (a[id].username.toLowerCase() < b[id].username.toLowerCase())
          return order === 'asc' ? 1 : -1;
        if (a[id].username.toLowerCase() > b[id].username.toLowerCase())
          return order === 'asc' ? -1 : 1;
        return 0;
      });
    } else if (id === CREATED) {
      data.sort((a, b) => {
        if (a[id] < b[id]) return order === 'asc' ? 1 : -1;
        if (a[id] > b[id]) return order === 'asc' ? -1 : 1;
        return 0;
      });
    } else {
      data.sort((a, b) => {
        if (a[id].toLowerCase() < b[id].toLowerCase())
          return order === 'asc' ? 1 : -1;
        if (a[id].toLowerCase() > b[id].toLowerCase())
          return order === 'asc' ? -1 : 1;
        return 0;
      });
    }

    const newOrder = order === 'asc' && sortedBy === id ? 'desc' : 'asc';

    this.setState(() => ({
      data,
      order: newOrder,
      sortedBy: id,
    }));
  };

  handleNewAsset = () => {
    this.props.history.push(`${this.props.location.pathname}/new`);
  };

  render() {
    const { data, order, sortedBy } = this.state;

    return (
      <Wrapper>
        <ButtonWrapper>
          <Button
            variant="raised"
            color="primary"
            onClick={this.handleNewAsset}
          >
            New Asset
          </Button>
        </ButtonWrapper>
        <TableWrapper>
          <Table>
            <TableHead>
              <TableRow>
                {columnData.map(column => (
                  <TableCell key={column.id} numeric={column.numeric}>
                    <TableSortLabel
                      active={column.id === sortedBy}
                      direction={order}
                      onClick={() => this.handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(d => (
                <TableRow
                  key={d._id}
                  onClick={e => this.handleClick(e, d._id, d.creator._id)}
                >
                  <TableCell>{d.content_type}</TableCell>
                  <LinkCell data-name={CREATOR}>{d.creator.username}</LinkCell>
                  <TableCell>{d.title}</TableCell>
                  <TableCell>{new Date(d.created).toUTCString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
      </Wrapper>
    );
  }
}

Assets.propTypes = propTypes;

export default Assets;
