import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = props => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary"></i> Modifica il Profilo
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-primary"></i> Aggiungi Esperienza
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fas fa-graduation-cap text-primary"></i> Aggiungi
        Educazione
      </Link>
    </div>
  );
};

export default DashboardActions;
