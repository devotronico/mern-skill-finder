import React from 'react';
import PropTypes from 'prop-types';

const FilterStars = ({ starsFilter, setStarsFilter }) => {
  return (
    <div className="form-group btn-group">
      <button
        className={`btn btn-${starsFilter === -1 ? 'primary' : 'light'}`}
        onClick={() => setStarsFilter(-1)}
      >
        ALL
      </button>
      <button
        className={`btn btn-${starsFilter === 0 ? 'primary' : 'light'}`}
        onClick={() => setStarsFilter(0)}
      >
        <i className="far fa-star" />
      </button>
      <button
        className={`btn btn-${starsFilter === 1 ? 'primary' : 'light'}`}
        onClick={() => setStarsFilter(1)}
      >
        <i className="fas fa-star" />
      </button>
      <button
        className={`btn btn-${starsFilter === 2 ? 'primary' : 'light'}`}
        onClick={() => setStarsFilter(2)}
      >
        <i className="fas fa-star" />
        <i className="fas fa-star" />
      </button>
      <button
        className={`btn btn-${starsFilter === 3 ? 'primary' : 'light'}`}
        onClick={() => setStarsFilter(3)}
      >
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
      </button>
      <small className="form-text">valutazione</small>
    </div>
  );
};

FilterStars.propTypes = {
  starsFilter: PropTypes.number.isRequired,
  setStarsFilter: PropTypes.func.isRequired
};

export default FilterStars;
