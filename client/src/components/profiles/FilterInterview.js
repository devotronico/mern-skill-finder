import React from 'react';
import PropTypes from 'prop-types';

const FilterInterview = ({ interviewFilter, setInterviewFilter }) => {
  return (
    <div className="form-group btn-group">
      <button
        className={`btn btn-${interviewFilter === 0 ? 'primary' : 'light'}`}
        onClick={() => setInterviewFilter(0)}
      >
        ALL
      </button>
      <button
        className={`btn btn-${
          interviewFilter === 1 ? 'primary' : 'light'}`}
        onClick={() => setInterviewFilter(1)}
      >
        <i className="far fa-comments" />
      </button>
      <button
        className={`btn btn-${
          interviewFilter === 2 ? 'primary' : 'light'}`}
        onClick={() => setInterviewFilter(2)}
      >
        <i className="fas fa-comments" />
      </button>
      <small className="form-text">colloqui</small>
    </div>
  );
};

FilterInterview.propTypes = {
  interviewFilter: PropTypes.number.isRequired,
  setInterviewFilter: PropTypes.func.isRequired
};

export default FilterInterview;
