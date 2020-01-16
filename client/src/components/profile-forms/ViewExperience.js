import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCurrentProfile,
  editExperience,
  deleteExperience
} from '../../actions/profile';
import moment from 'moment';

const ViewExperience = ({
  profile: { profile, loading },
  getCurrentProfile,
  editExperience,
  deleteExperience,
  history,
  match
}) => {
  const [formData, setFormData] = useState({
    _id: '',
    company: '',
    title: '',
    address: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const [experienceId] = useState(match.params.id);

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile, match.params.id]);

  useEffect(() => {
    if (!loading) {
      const experience = profile.experience.find(
        item => item._id === experienceId
      );

      setFormData({
        _id: experience._id,
        company: experience.company,
        title: experience.title,
        address: experience.address,
        from: moment.utc(experience.from).format('YYYY-MM-DD'),
        to: moment.utc(experience.to).format('YYYY-MM-DD'),
        current: experience.current,
        description: experience.description
      });
    }
  }, [loading]);

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    _id,
    company,
    title,
    address,
    from,
    to,
    current,
    description
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <>
      <h1 className="large text-primary">Esperienza</h1>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
      <p className="lead">
        <i className="fas fa-code-branch" /> Aggiungi eventuali posizioni che
        hai avuto in passato
      </p>
      <small>* = campi obbligatori</small>
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          editExperience(formData, history);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* Titolo di lavoro"
            name="title"
            value={title}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Azienda"
            name="company"
            value={company}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Località"
            name="address"
            value={address}
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
            Lavoro corrente
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
          onClick={() => deleteExperience(_id, history)}
          className="btn btn-danger"
        >
          <i className="fas fa-trash" />
        </button>
      </div>
    </>
  );
};

ViewExperience.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  editExperience: PropTypes.func.isRequired,
  deleteExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  editExperience,
  deleteExperience
})(withRouter(ViewExperience));
