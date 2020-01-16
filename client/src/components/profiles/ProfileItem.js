import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

const ProfileItem = ({
  profilo: {
    user: { _id, name, avatar },
    status,
    company,
    address,
    distance,
    skills,
    isFavorite,
    isInterviewed,
    stars,
    experience,
    education,
    date
  }
}) => {
  return (
    <Link to={`/profile/${_id}`} className="profile bg-light">
      <img src={avatar} alt="" className="round-img" />
      <div className="item-center">
        <h2>{name}</h2>
        <p className="status">
          {status} {company && <span> at {company}</span>}
        </p>
        <p className="address">
          {address && (
            <small>
              <i className="fas fa-map-marker-alt" /> {address}
            </small>
          )}
        </p>
        <p className="info">
          <i className={`${isFavorite === 2 ? 'fas' : 'far'} fa-heart`} />
          {' | '}
          <i className={`${isInterviewed === 2? 'fas' : 'far'} fa-comments`} />
          {' | '}
          {Array(3)
            .fill()
            .map((x, i) =>
              stars > 0 && i + 1 <= stars ? (
                <i key={i} className="fas fa-star" />
              ) : (
                <i key={i} className="far fa-star" />
              )
            )}
          {' | '}
          <i className="fas fa-road" /> {distance && <>{distance / 1000} KM</>}
        </p>
        <p>
          <small>Numero di Esperienze</small> <b>{experience.length}</b>
        </p>
        <p>
          <small>Numero di Educazione</small> <b>{education.length}</b>
        </p>
        <p>
          <small>
            Iscritto il <Moment format="YYYY/MM/DD">{moment.utc(date)}</Moment>
          </small>
        </p>
      </div>
      <div className="item-right">
        {skills.slice(0, 8).map((skill, index) => (
          <span key={index} className="text-primary">
            {skill.startsWith('*') ? (
              <span className="skill selected">
                {skill.replace('*', '')}
                {'  '}
              </span>
            ) : (
              <span className="skill">
                {skill.replace('*', '')}
                {'  '}
              </span>
            )}
          </span>
        ))}
      </div>
    </Link>
  );
};

ProfileItem.propTypes = {
  profilo: PropTypes.object.isRequired
};

export default ProfileItem;
