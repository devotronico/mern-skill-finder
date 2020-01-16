import React from 'react';
import PropTypes from 'prop-types';

const FilterWorked = ({ workedFilter, setWorkedFilter }) => {
  return (
    <div className="form-group btn-group">
      <button
        className={`btn btn-${!workedFilter ? 'primary' : 'light'}`}
        onClick={() => setWorkedFilter('')}
      >
        ALL
      </button>
      <button
        className={`btn btn-${
          workedFilter === 'mai lavorato' ? 'primary' : 'light'
        }`}
        onClick={() => setWorkedFilter('mai lavorato')}
      >
        mai lavorato
      </button>
      <button
        className={`btn btn-${
          workedFilter === 'ha lavorato' ? 'primary' : 'light'
        }`}
        onClick={() => setWorkedFilter('ha lavorato')}
      >
        ha lavorato
      </button>
      <button
        className={`btn btn-${
          workedFilter === 'ci lavora' ? 'primary' : 'light'
        }`}
        onClick={() => setWorkedFilter('ci lavora')}
      >
        ci lavora
      </button>
      <small className="form-text">aver lavorato in azienda</small>
    </div>
  );
};

FilterWorked.propTypes = {
  workedFilter: PropTypes.string.isRequired,
  setWorkedFilter: PropTypes.func.isRequired
};

export default FilterWorked;
