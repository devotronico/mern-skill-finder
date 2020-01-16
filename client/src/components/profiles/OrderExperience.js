import React from 'react';
import PropTypes from 'prop-types';

const OrderExperience = ({ sortBy, setSortBy }) => {
  return (
    <div className="form-group btn-group">
      <button
        className={`btn btn-${
          sortBy.type === 'experience' && sortBy.dir === 'asc'
            ? 'primary'
            : 'light'
        }`}
        onClick={() => setSortBy({ type: 'experience', dir: 'asc' })}
      >
        <i className="fas fa-sort-numeric-down" />
      </button>
      <button
        className={`btn btn-${
          sortBy.type === 'experience' && sortBy.dir === 'desc'
            ? 'primary'
            : 'light'
        }`}
        onClick={() => setSortBy({ type: 'experience', dir: 'desc' })}
      >
        <i className="fas fa-sort-numeric-up" />
      </button>
      <small className="form-text">esperienze</small>
    </div>
  );
};

OrderExperience.propTypes = {
  sortBy: PropTypes.object.isRequired,
  setSortBy: PropTypes.func.isRequired
};

export default OrderExperience;
