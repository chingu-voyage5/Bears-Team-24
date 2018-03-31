import React from 'react';
import PropTypes from 'prop-types';

// Material UI components
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableSortLabel,
} from 'material-ui/Table';

import actions from './actions';
import { ButtonWrapper, LinkCell, TableRow, Wrapper } from './styled';

const propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

const CREATOR = 'creator';

const columnData = [
  { id: 'topic', numeric: false, label: 'Topic' },
  { id: 'sub_topic', numeric: false, label: 'Sub Topic' },
  { id: 'title', numeric: false, label: 'Title' },
  { id: CREATOR, numeric: false, label: 'Owner' },
];

class Articles extends React.Component {
  state = {
    data: [],
    order: 'asc',
  };

  componentDidMount = () => {
    this.fetchData().then(data => this.setState({ data }));
  };

  // eslint-disable-next-line
  fetchData() {
    return actions.getAll();
  }

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

  handleClick = (e, articleId, creatorId) => {
    e.preventDefault();

    const { name } = e.target.dataset;

    if (name === CREATOR) {
      this.props.history.push(`/users/${creatorId}`);
    } else {
      this.props.history.push(`${this.props.location.pathname}/${articleId}`);
    }
  };

  handleNewArticle = () => {
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
            onClick={this.handleNewArticle}
          >
            New Article
          </Button>
        </ButtonWrapper>
        <Paper>
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
                  <TableCell>{d.topic}</TableCell>
                  <TableCell>{d.sub_topic}</TableCell>
                  <TableCell>{d.title}</TableCell>
                  <LinkCell data-name={CREATOR}>{d.creator.username}</LinkCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Wrapper>
    );
  }
}

Articles.propTypes = propTypes;

export default Articles;
