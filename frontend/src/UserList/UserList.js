import React from 'react';
import { Link } from 'react-router-dom';

// Material UI components
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';

import actions from './actions';
import avatarPlaceholder from './avatar_placeholder.png';
import { Wrapper } from './styled';

const columnData = [
  { id: 'avatar', numeric: false, label: 'Avatar', unsortable: true },
  { id: 'username', numeric: false, label: 'Username' },
  { id: 'role', numeric: false, label: 'Role' },
];

class UserList extends React.Component {
  state = {
    data: [],
    order: 'asc',
  };

  componentDidMount = () => {
    actions
      .getUserList()
      .then(json => {
        this.setState({ data: json });
      })
      // eslint-disable-next-line no-console
      .catch(err => console.error(err));
  };

  handleSort = id => {
    const { data, sortedBy } = this.state;
    let { order } = this.state;

    if (id !== sortedBy) {
      order = 'desc';
    }

    data.sort((a, b) => {
      if (a[id].toLowerCase() < b[id].toLowerCase())
        return order === 'asc' ? 1 : -1;
      if (a[id].toLowerCase() > b[id].toLowerCase())
        return order === 'asc' ? -1 : 1;
      return 0;
    });

    const newOrder = order === 'asc' && sortedBy === id ? 'desc' : 'asc';

    this.setState(() => ({
      data,
      order: newOrder,
      sortedBy: id,
    }));
  };

  render() {
    const { data, order, sortedBy } = this.state;

    return (
      <Wrapper>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                {columnData.map(column => (
                  <TableCell key={column.id} numeric={column.numeric}>
                    {column.unsortable ? (
                      column.label
                    ) : (
                      <TableSortLabel
                        active={column.id === sortedBy}
                        direction={order}
                        onClick={() => this.handleSort(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(d => (
                <TableRow key={d._id}>
                  <TableCell>
                    <Avatar src={d.avatar || avatarPlaceholder} alt="avatar" />
                  </TableCell>
                  <TableCell>
                    <Link to={`/users/${d._id}`}>{d.username}</Link>
                  </TableCell>
                  <TableCell>{d.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Wrapper>
    );
  }
}

export default UserList;
