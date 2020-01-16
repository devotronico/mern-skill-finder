import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const Experience = ({ experience }) => {
  const experiences = experience.map(exp => (
    <Link to={`experience/${exp._id}`} key={exp._id} className="row">
      <div className="td">{exp.company}</div>
      <div className="td hide-sm">{exp.title}</div>
      <div className="td hide-sm">
        <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{' '}
        {exp.to === null ? (
          ' Adesso'
        ) : (
          <Moment format="DD/MM/YYYY">{exp.to}</Moment>
        )}
      </div>
    </Link>
  ));

  return (
    <>
      <h2 className="my-2">Esperienze</h2>
      <div className="experience">
        <div className="row">
          <div className="th">Azienda</div>
          <div className="th hide-sm">Titolo</div>
          <div className="th hide-sm">Anni</div>
        </div>
        {experiences}
      </div>
    </>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired
};
export default Experience;

