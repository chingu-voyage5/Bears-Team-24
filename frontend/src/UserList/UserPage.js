import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import actions from './actions';

export default class UserPage extends React.Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
  };
  state = {
    user: {},
  };
  componentDidMount = () => {
    actions.getUser(this.props.userId).then(json => {
      this.setState({ user: json.user });
    });
  };
  render() {
    const { user } = this.state;
    let userInfo = (
      <p>
        User not found. Type &apos;/users&apos; in address bar and hit Enter (or
        click the button below) to see all registered users
      </p>
    );
    if (user) {
      const { _id, username, role, email, avatar, bio } = user;
      userInfo = (
        <table>
          <tbody>
            <tr>
              <td className="avatar" colSpan="2">
                <img src={avatar} alt="avatar" />
              </td>
            </tr>
            <tr>
              <td> Name</td>
              <td> {username}</td>
            </tr>
            <tr>
              <td> ID</td>
              <td> {_id}</td>
            </tr>
            <tr>
              <td> Email</td>
              <td> {email}</td>
            </tr>
            <tr>
              <td> Role</td>
              <td> {role}</td>
            </tr>
            <tr>
              <td> Avatar</td>
              <td> {avatar}</td>
            </tr>
            <tr>
              <td> Bio</td>
              <td> {bio}</td>
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
