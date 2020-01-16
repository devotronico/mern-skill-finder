import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import ProfileFilter from './ProfileFilter';
import { getProfiles } from '../../actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  const [profili, setProfili] = useState([]);
  const [allProfiles, setAllProfiles] = useState('');

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  useEffect(() => {
    // console.log('1 profili', profili);
    // console.log('1 allProfiles', allProfiles);
  }, [profili]);

  useEffect(() => {
    // console.log(123456);
    if (!loading && profiles) {
      // const copy = JSON.parse(JSON.stringify(profiles));
      setProfili(profiles);
      const copyAllProfile = JSON.stringify(profiles);
      setAllProfiles(copyAllProfile);
    } else {
      console.log('caricamento...');
    }
  }, [loading, profiles]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary" id="title">
            Profili
          </h1>
          <ProfileFilter
            allProfiles={allProfiles}
            profili={profili}
            setProfili={setProfili}
          />
          <div className="profiles">
            {profili.length > 0 ? (
              profili.map(profilo => (
                <ProfileItem key={profilo._id} profilo={profilo} />
              ))
            ) : (
              <h4>Nessun profilo trovato...</h4>
            )}
          </div>
        </>
      )}
    </>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
