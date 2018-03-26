import React from 'react';
import { Link } from 'react-router-dom';
import actions from './actions';

class UserList extends React.Component {
  state = {
    data: [],
  };

  componentDidMount = () => {
    actions
      .getUserList()
      .then(json => {
        this.setState({ data: json });
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err));
  };

  render() {
    const { data } = this.state;
    return (
      <section className="user-list">
        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {data.map(d => (
              <tr key={d._id}>
                <td>
                  <img className="avatar" src={d.avatar} alt="avatar" />
                </td>
                <td>
                  <Link to={`/users/${d._id}`}>{d.username}</Link>
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

export default UserList;
