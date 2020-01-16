import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAction from './ProfileAction';
import ProfileNote from './ProfileNote';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import { getProfileById } from '../../actions/profile';
import {
  setFavorite,
  setInterviewed,
  setStars,
  setWorked,
  saveNote
} from '../../actions/profile';

const Profile = ({
  getProfileById,
  setFavorite,
  setInterviewed,
  setStars,
  setWorked,
  saveNote,
  profile: { profile, loading },
  auth,
  match
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  useEffect(() => {
    if (!loading && profile) {
      setLoaded(true);
      // console.log('user_id', auth.user._id);
      // console.log('profile_user_id', profile.user._id);
      // console.log('worked->client', profile.worked);
      // console.log('isFavorite', profile.isFavorite);
      // console.log('isInterviewed', profile.isInterviewed);
      // console.log('stars', profile.stars);
    }
  }, [loading, profile]);

  return (
    <>
      {!loaded ? (
        <Spinner />
      ) : (
        <>
          <Link to="/profiles" className="btn btn-light">
            <i className="fas fa-long-arrow-alt-left" /> Profili
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Modifica il Profilo
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAction
              id={profile._id}
              isFavorite={profile.isFavorite}
              isInterviewed={profile.isInterviewed}
              stars={profile.stars}
              worked={profile.worked}
              setFavorite={setFavorite}
              setInterviewed={setInterviewed}
              setStars={setStars}
              setWorked={setWorked}
            />
            <ProfileNote
              id={profile._id}
              oldNote={profile.note}
              saveNote={saveNote}
            />

            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Esperienza</h2>
              {profile.experience.length > 0 ? (
                <>
                  {profile.experience.map(experience => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </>
              ) : (
                <h4>Nessuna credenziale di esperienza</h4>
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Educazione</h2>
              {profile.education.length > 0 ? (
                <>
                  {profile.education.map(education => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </>
              ) : (
                <h4>Nessuna credenziale per l'istruzione</h4>
              )}
            </div>

            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </>
      )}
    </>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  setFavorite: PropTypes.func.isRequired,
  setInterviewed: PropTypes.func.isRequired,
  setStars: PropTypes.func.isRequired,
  setWorked: PropTypes.func.isRequired,
  saveNote: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getProfileById,
  setFavorite,
  setInterviewed,
  setStars,
  setWorked,
  saveNote
})(Profile);
