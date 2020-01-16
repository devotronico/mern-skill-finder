import React from 'react';
import PropTypes from 'prop-types';

const OrderEducation = ({ sortBy, setSortBy }) => {
  return (
    <div className="form-group btn-group">
      <button
        className={`btn btn-${
          sortBy.type === 'education' && sortBy.dir === 'asc'
            ? 'primary'
            : 'light'
        }`}
        onClick={() => setSortBy({ type: 'education', dir: 'asc' })}
      >
        <i className="fas fa-sort-numeric-down" />
      </button>
      <button
        className={`btn btn-${
          sortBy.type === 'education' && sortBy.dir === 'desc'
            ? 'primary'
            : 'light'
        }`}
        onClick={() => setSortBy({ type: 'education', dir: 'desc' })}
      >
        <i className="fas fa-sort-numeric-up" />
      </button>
      <small className="form-text">educazione</small>
    </div>
  );
};

OrderEducation.propTypes = {
  sortBy: PropTypes.object.isRequired,
  setSortBy: PropTypes.func.isRequired
};

export default OrderEducation;
