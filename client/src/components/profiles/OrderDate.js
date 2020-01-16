import React from 'react';
import PropTypes from 'prop-types';

const OrderDate = ({ sortBy, setSortBy }) => {
  return (
    <div className="form-group btn-group">
      <button
        className={`btn btn-${
          sortBy.type === 'date' && sortBy.dir === 'asc' ? 'primary' : 'light'
        }`}
        onClick={() => setSortBy({ type: 'date', dir: 'asc' })}
      >
        <i className="fas fa-sort-numeric-down" />
      </button>
      <button
        className={`btn btn-${
          sortBy.type === 'date' && sortBy.dir === 'desc' ? 'primary' : 'light'
        }`}
        onClick={() => setSortBy({ type: 'date', dir: 'desc' })}
      >
        <i className="fas fa-sort-numeric-up" />
      </button>
      <small className="form-text">data</small>
    </div>
  );
};

OrderDate.propTypes = {
  sortBy: PropTypes.object.isRequired,
  setSortBy: PropTypes.func.isRequired
};

export default OrderDate;
