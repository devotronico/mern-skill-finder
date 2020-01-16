import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    address: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      company: loading || !profile.company ? '' : profile.company,
      website: loading || !profile.website ? '' : profile.website,
      address: loading || !profile.address ? '' : profile.address,
      status: loading || !profile.status ? '' : profile.status,
      skills: loading || !profile.skills ? '' : profile.skills.join(','),
      githubusername:
        loading || !profile.githubusername ? '' : profile.githubusername,
      bio: loading || !profile.bio ? '' : profile.bio,
      twitter: loading || !profile.social ? '' : profile.social.twitter,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      linkedin: loading || !profile.social ? '' : profile.social.linkedin,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      instagram: loading || !profile.social ? '' : profile.social.instagram
    });
  }, [loading, getCurrentProfile]);

  const {
    company,
    website,
    address,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    // console.log(formData);
    createProfile(formData, history, true);
  };

  return (
    <>
      <h2 className="large text-primary">Modifica il tuo Profilo</h2>
      <p className="lead">
        <i className="fas fa-user" /> migliora il tuo profilo
      </p>
      <small>* = campi obbligatori</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={e => onChange(e)}>
            <option>* Seleziona la tua professione</option>
            <option value="Manager">Manager</option>
            <option value="Programmatore">Programmatore</option>
            <option value="Sistemista">Sistemista</option>
            <option value="Commerciale">Commerciale</option>
            <option value="Altro">Altro</option>
          </select>
          <small className="form-text">seleziona il tuo campo di lavoro</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Azienda"
            name="company"
            value={company}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            può essere la tua azienda o quella per cui lavori
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Sito web"
            name="website"
            value={website}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            può essere il tuo sito web o di un'azienda per cui hai lavorato
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Indirizzo"
            name="address"
            value={address}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            il tuo indirizzo: via, civico, cap, città, provincia
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Competenze"
            name="skills"
            value={skills}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            ogni competenze deve essere separata dalla virgola(es. HTML,CSS,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github username"
            name="githubusername"
            value={githubusername}
            onChange={e => onChange(e)}
          />
          <small className="form-text">il tuo username su Github</small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="raccontaci qualcosa su di te"
            name="bio"
            value={bio}
            onChange={e => onChange(e)}
          />
          <small className="form-text">raccontaci qualcosa su di te</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Aggiungi i link ai tuoi social network
          </button>
          <span>opzionale</span>
        </div>

        {displaySocialInputs && (
          <>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x" />
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x" />
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x" />
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x" />
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x" />
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={e => onChange(e)}
              />
            </div>
          </>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Torna indietro
        </Link>
      </form>
    </>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
