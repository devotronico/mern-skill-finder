import React from 'react';
import PropTypes from 'prop-types';

const OrderDistance = ({ sortBy, setSortBy }) => {
  return (
    <div className="form-group btn-group">
      <button
        className={`btn btn-${
          sortBy.type === 'skills' && sortBy.dir === 'asc' ? 'primary' : 'light'
        }`}
        onClick={() => setSortBy({ type: 'skills', dir: 'asc' })}
      >
        <i className="fas fa-sort-numeric-down" />
      </button>
      <button
        className={`btn btn-${
          sortBy.type === 'skills' && sortBy.dir === 'desc'
            ? 'primary'
            : 'light'
        }`}
        onClick={() => setSortBy({ type: 'skills', dir: 'desc' })}
      >
        <i className="fas fa-sort-numeric-up" />
      </button>
      <small className="form-text">skills</small>
    </div>
  );
};

OrderDistance.propTypes = {
  sortBy: PropTypes.object.isRequired,
  setSortBy: PropTypes.func.isRequired
};

export default OrderDistance;
