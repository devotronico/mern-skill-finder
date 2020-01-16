import React from 'react';
import PropTypes from 'prop-types';

const OrderName = ({ sortBy, setSortBy }) => {
  return (
    <div className="form-group btn-group">
      <button
        className={`btn btn-${
          sortBy.type === 'name' && sortBy.dir === 'asc' ? 'primary' : 'light'
        }`}
        onClick={() => setSortBy({ type: 'name', dir: 'asc' })}
      >
        <i className="fas fa-sort-alpha-down" />
      </button>
      <button
        className={`btn btn-${
          sortBy.type === 'name' && sortBy.dir === 'desc' ? 'primary' : 'light'
        }`}
        onClick={() => setSortBy({ type: 'name', dir: 'desc' })}
      >
        <i className="fas fa-sort-alpha-up" />
      </button>
      <small className="form-text">nome</small>
    </div>
  );
};

OrderName.propTypes = {
  sortBy: PropTypes.object.isRequired,
  setSortBy: PropTypes.func.isRequired
};

export default OrderName;
