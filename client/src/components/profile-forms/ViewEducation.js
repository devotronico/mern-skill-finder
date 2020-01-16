import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCurrentProfile,
  editEducation,
  deleteEducation
} from '../../actions/profile';
import moment from 'moment';

const ViewEducation = ({
  profile: { profile, loading },
  getCurrentProfile,
  editEducation,
  deleteEducation,
  history,
  match
}) => {
  const [formData, setFormData] = useState({
    _id: '',
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const [educationId] = useState(match.params.id);

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile, match.params.id]);

  useEffect(() => {
    if (!loading) {
      const education = profile.education.find(
        item => item._id === educationId
      );

      setFormData({
        _id: education._id,
        school: education.school,
        degree: education.degree,
        fieldofstudy: education.fieldofstudy,
        from: moment.utc(education.from).format('YYYY-MM-DD'),
        to: moment.utc(education.to).format('YYYY-MM-DD'),
        current: education.current,
        description: education.description
      });
    }
  }, [loading]);

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    _id,
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <>
      <h1 className="large text-primary">Educazione</h1>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
      <p className="lead">
        <i className="fas fa-code-branch" /> Aggiungi qualsiasi tipo di
        formazione che hai ricevuto, scuole, corsi, etc.
      </p>
      <small>* = campi obbligatori</small>
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          editEducation(formData, history);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* Scuola, Corso, Bootcamp, etc."
            name="school"
            value={school}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Titolo di studio o Certificato"
            name="degree"
            value={degree}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Campo di studi"
            name="fieldofstudy"
            value={fieldofstudy}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>Data Inizio</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={() => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />{' '}
            Scuola corrente
          </p>
        </div>
        <div className="form-group">
          <h4>Data Fine</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={e => onChange(e)}
            disabled={toDateDisabled ? 'disabled' : ''}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Descrizione del lavoro"
            value={description}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Torna indietro
        </Link>
      </form>
      <div className="test">
        <button
          onClick={() => deleteEducation(_id, history)}
          className="btn btn-danger"
        >
          <i className="fas fa-trash" />
        </button>
      </div>
    </>
  );
};

ViewEducation.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  editEducation: PropTypes.func.isRequired,
  deleteEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  editEducation,
  deleteEducation
})(withRouter(ViewEducation));
