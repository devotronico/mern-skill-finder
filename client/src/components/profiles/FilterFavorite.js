import React from 'react';
import PropTypes from 'prop-types';

const FilterFavorite = ({ favoriteFilter, setFavoriteFilter }) => {
  return (
    <div className="form-group btn-group">
      <button
        className={`btn btn-${favoriteFilter === 0 ? 'primary' : 'light'}`}
        onClick={() => setFavoriteFilter(0)}
      >
        ALL
      </button>
      <button
        className={`btn btn-${favoriteFilter === 1 ? 'primary' : 'light'}`}
        onClick={() => setFavoriteFilter(1)}
      >
        <i className="far fa-heart" />
      </button>
      <button
        className={`btn btn-${favoriteFilter === 2 ? 'primary' : 'light'}`}
        onClick={() => setFavoriteFilter(2)}
      >
        <i className="fas fa-heart" />
      </button>
      <small className="form-text">favoriti</small>
    </div>
  );
};

FilterFavorite.propTypes = {
  favoriteFilter: PropTypes.number.isRequired,
  setFavoriteFilter: PropTypes.func.isRequired
};

export default FilterFavorite;
