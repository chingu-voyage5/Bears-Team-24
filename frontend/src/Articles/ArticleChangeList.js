import React from 'react';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import actions from './actions';

import { LinkCell, TableRow, TableWrapper, Wrapper } from './styled';

const REQUESTER = 'requester';

const columnData = [
  { id: 'topic', numeric: false, label: 'Topic' },
  { id: 'sub_topic', numeric: false, label: 'Sub Topic' },
  { id: 'title', numeric: false, label: 'Title' },
  { id: REQUESTER, numeric: false, label: 'Requester' },
];

export default class ArticleChangeList extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    data: [],
    order: 'asc',
  };

  componentDidMount = () => {
    this.fetchData()
      .then(res => {
        console.log('article change list response:', res);
        const data = res.map(request => ({
          ...request,
          title: request.article.title,
          topic: request.article.topic.name,
          sub_topic: request.article.sub_topic
            ? request.article.sub_topic.name
            : '',
        }));
        this.setState({ data });
      })
      // eslint-disable-next-line no-console
      .catch(e => console.error('mounted error:', e));
  };

  // eslint-disable-next-line class-methods-use-this
  fetchData() {
    return actions.getArticleChangeRequestList();
  }

  handleSort = id => {
    const { data, sortedBy } = this.state;
    let { order } = this.state;

    if (id !== sortedBy) {
      order = 'desc';
    }

    if (id === REQUESTER) {
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

  handleClick = (e, articleId, requesterId) => {
    e.preventDefault();

    const { name } = e.target.dataset;

    if (name === REQUESTER) {
      this.props.history.push(`/users/${requesterId}`);
    } else {
      this.props.history.push(`${this.props.location.pathname}/${articleId}`);
    }
  };

  render() {
    const { data, order, sortedBy } = this.state;
    return (
      <Wrapper>
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
                  onClick={e =>
                    this.handleClick(e, d.article._id, d.requester._id)
                  }
                >
                  <TableCell>{d.topic}</TableCell>
                  <TableCell>{d.sub_topic}</TableCell>
                  <TableCell>{d.title}</TableCell>
                  <LinkCell data-name={REQUESTER}>
                    {d.requester.username}
                  </LinkCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
      </Wrapper>
    );
  }
}
