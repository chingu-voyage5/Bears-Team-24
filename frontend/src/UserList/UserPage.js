import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import mockUsers from './MOCK_DATA.json';

export default class UserPage extends React.Component {
  render() {
    const ids = mockUsers.map(a => a._id);
    const number = ids.indexOf(this.props.userId);

    let userInfo = (
      <p>
        User ID {this.props.userId} not found. Type &apos;/users&apos; in
        address bar and hit Enter (or click the button below) to see all
        registered users
      </p>
    );

    if (number !== -1) {
      const d = mockUsers[number];

      userInfo = (
        <table>
          <tbody>
            <tr>
              <td className="avatar" colSpan="2">
                <img src={d.avatar} alt="avatar" />
              </td>
            </tr>
            <tr>
              <td> Name</td>
              <td> {d.name}</td>
            </tr>
            <tr>
              <td> ID</td>
              <td> {d._id}</td>
            </tr>
            <tr>
              <td> Email</td>
              <td> {d.email}</td>
            </tr>
            <tr>
              <td> Role</td>
              <td> {d.role}</td>
            </tr>
            <tr>
              <td> Avatar</td>
              <td> {d.avatar}</td>
            </tr>
            <tr>
              <td> Bio</td>
              <td> {d.bio}</td>
            </tr>
          </tbody>
        </table>
      );
    }

    return (
      <section className="user-page">
        {userInfo}
        <Link to="/users">
          <button>Back to users list</button>
        </Link>
      </section>
    );
  }
}

UserPage.propTypes = {
  userId: PropTypes.string.isRequired,
};
