import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const Education = ({ education }) => {
  const educations = education.map(edu => (
    <Link to={`education/${edu._id}`} key={edu._id} className="row">
       <div className="td">{edu.school}</div>
       <div className="td hide-sm">{edu.degree}</div>
       <div className="td hide-sm">
        <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{' '}
        {edu.to === null ? (
          ' Adesso'
        ) : (
          <Moment format="DD/MM/YYYY">{edu.to}</Moment>
        )}
      </div>
    </Link>
  ));

  return (
    <>
      <h2 className="my-2">Educazione</h2>
      <div className="education">
        <div className="row">
          <div className="th">Scuola</div>
          <div className="th hide-sm">Grado</div>
          <div className="th hide-sm">Anni</div>
        </div>
        {educations}
      </div>
    </>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
};

export default Education;

