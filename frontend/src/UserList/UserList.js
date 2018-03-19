import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
  data: PropTypes.array,
};

const defaultProps = {
  data: [],
};

class UserList extends React.Component {
  render() {
    return (
      <section className="user-list">
        <table>
          <tbody>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Role</th>
            </tr>
            {this.props.data.map(d => (
              <tr key={d._id}>
                <td>
                  <img className="avatar" src={d.avatar} alt="avatar" />
                </td>
                <td>
                  <Link to={`/users/${d._id}`}>{d.name}</Link>
                </td>
                <td>{d.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}

UserList.propTypes = propTypes;
UserList.defaultProps = defaultProps;

export default UserList;
