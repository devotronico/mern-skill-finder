import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

const ProfileNote = ({ id, oldNote, saveNote }) => {
  const [displayTextarea, toggleTextarea] = useState(false);
  const [note, setNote] = useState(oldNote);

  const onChange = e => setNote(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    toggleTextarea(false);
    console.log(note);
    saveNote(id, note);
  };

  return (
    <div className="profile-note bg-white p">
      {!displayTextarea ? (
        <>
          <form className="form">
            <div className="form-group">
              <textarea
                placeholder="aggiungi una nota su questo profilo"
                value={note}
                disabled={true}
              />
            </div>
          </form>
          <button
            onClick={() => toggleTextarea(true)}
            type="button"
            className="btn btn-light my-1"
          >
            Modifica la Nota
          </button>
        </>
      ) : (
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <textarea
              placeholder="aggiungi una nota su questo profilo"
              name="note"
              value={note}
              onChange={e => onChange(e)}
            />
          </div>
          <input type="submit" className="btn btn-primary my-1" />
        </form>
      )}
    </div>
  );
};

// ProfileNote.propTypes = {
//   createProfile: PropTypes.func.isRequired,
//   getCurrentProfile: PropTypes.func.isRequired,
//   profile: PropTypes.object.isRequired
// };

export default ProfileNote;
