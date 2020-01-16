import React from 'react';
import { NavLink } from 'react-router-dom';

function NavlinkPrivateRole({ children, ...rest }) {
  // console.log(rest);
  const { to, roles, role, activeClassName } = rest;
  // console.log('to', to);
  // console.log('roles', roles);
  // console.log('role', role);
  // console.log('activeClassName', activeClassName);
  return (
    <>
      {roles.includes(role) ? (
        <li>
          <NavLink to={to} exact activeClassName={activeClassName}>
            {children}
          </NavLink>
        </li>
      ) : null}
    </>
  );
}

export default NavlinkPrivateRole;
