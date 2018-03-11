import React from 'react';

import mockUsers from './MOCK_DATA.json';

export default class UserList extends React.Component {
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
            {mockUsers.map(d => (
              <tr key={d._id}>
                <td>
                  <img className="avatar" src={d.avatar} alt="avatar" />
                </td>
                <td>
                  <a target="_blank" href={`/users/${d._id}`}>
                    {d.name}
                  </a>
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
