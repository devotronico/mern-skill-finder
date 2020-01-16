import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Sidebar = ({ auth: { isAuthenticated, loading, user } }) => {
  return (
    <div className="sidebar">
      <ul className="sidenav">
        <li>
          <Link to="/dashboard">
            <i className="fas fa-th" />
            <span className="sidebar-text">{user ? user.name : 'nome'}</span>
          </Link>
        </li>
        <li>
          <Link to="/profiles">
            <i className="fas fa-users" />
            <span className="sidebar-text">Profili</span>
          </Link>
        </li>
        <li>
          <Link to="/logs">
            <i className="fas fa-exclamation-circle" />
            <span className="sidebar-text">Notifiche</span>
          </Link>
        </li>
        <li>
          <Link to="/statistics">
            <i className="fas fa-signal" />
            <span className="sidebar-text">Statistiche</span>
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <i className="fas fa-cogs" />
            <span className="sidebar-text">Impostazioni</span>
          </Link>
        </li>
        <li>
          <Link to="/test">
            <i className="fas fa-flask" />
            <span className="sidebar-text">Test</span>
          </Link>
        </li>
        <li>
          <Link to="/logout">
            <i className="fas fa-lock" />
            <span className="sidebar-text">Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

Sidebar.propTypes = {};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, null)(Sidebar);
