import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import NavlinkPrivateRole from './NavlinkPrivateRole';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  // if (!loading) {
  // console.log(user);
  // console.log(user.name);
  // console.log(user.role);
  // }
  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{' '}
          <span className="hide-sm">{user ? user.name : 'nome'}</span>
        </Link>
      </li>
      <NavlinkPrivateRole
        to="/profiles"
        activeClassName="selected"
        roles={['system', 'admin']}
        role={user ? user.role : 'user'}
      >
        <i className="fas fa-users" /> <span className="hide-sm">Profili</span>
      </NavlinkPrivateRole>
      {/* <li>
        <Link to="/posts">Posts</Link>
      </li> */}
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <NavlinkPrivateRole
        to="/profiles"
        activeClassName="selected"
        roles={['system', 'admin']}
        role={user ? user.role : 'user'}
      >
        Profili
      </NavlinkPrivateRole>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar">
      <h1 className="logo">
        <Link to="/">
          <i className="fas fa-search" />
          <span className="hide-sm"> Skill Finder</span>
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
