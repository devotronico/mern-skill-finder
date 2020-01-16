import React from 'react';

const ProfileAction = ({
  id,
  isFavorite,
  isInterviewed,
  stars,
  worked,
  setFavorite,
  setInterviewed,
  setStars,
  setWorked
}) => {
  return (
    <div className="profile-actions bg-light p">
      <div className="btn-action-heart-comments">
        <button className={`btn my-1`} onClick={() => setFavorite(id)}>
          <i className={`${isFavorite === 2 ? 'fas' : 'far'} fa-heart`} />
        </button>
        <span className="divisor"> | </span>
        <button className={`btn`} onClick={() => setInterviewed(id)}>
          <i className={`${isInterviewed === 2 ? 'fas' : 'far'} fa-comments`} />
        </button>
      </div>
      <span className="divisor"> | </span>
      <div className="btn-action-stars">
        {Array(3)
          .fill()
          .map((x, i) =>
            stars > 0 && i + 1 <= stars ? (
              <button
                key={i}
                className="btn"
                onClick={() => setStars(id, i + 1)}
              >
                <i className="fas fa-star" />
              </button>
            ) : (
              <button
                key={i}
                className="btn"
                onClick={() => setStars(id, i + 1)}
              >
                <i className="far fa-star" />
              </button>
            )
          )}
      </div>
      <span className="divisor"> | </span>

      <div className="btn-action-worked">
        <span className="small">In Azienda:</span>
        <button
          className="btn my-1"
          onClick={() => setWorked(id, 'mai lavorato')}
        >
          {worked === 'mai lavorato' ? (
            <b className="small">mai lavorato</b>
          ) : (
            <u className="small">mai lavorato</u>
          )}
        </button>
        {'/'}
        <button
          className="btn my-1"
          onClick={() => setWorked(id, 'ha lavorato')}
        >
          {worked === 'ha lavorato' ? (
            <b className="small">ha lavorato</b>
          ) : (
            <u className="small">ha lavorato</u>
          )}
        </button>
        {'/'}
        <button className="btn my-1" onClick={() => setWorked(id, 'ci lavora')}>
          {worked === 'ci lavora' ? (
            <b className="small">ci lavora</b>
          ) : (
            <u className="small">ci lavora</u>
          )}
        </button>
      </div>
      {/* <div className="btn-action-worked">
        <button
          className={`btn my-1`}
          onClick={() => setWorked(id, 'mai lavorato')}
        >
          <i
            className={`${worked === 'mai lavorato' ? 'fas' : 'far'} fa-circle`}
          />{' '}
          mai lavorato
        </button>
        <button className={`btn`} onClick={() => setWorked(id, 'ha lavorato')}>
          <i
            className={`${worked === 'ha lavorato' ? 'fas' : 'far'} fa-circle`}
          />{' '}
          ha lavorato
        </button>
        <button className={`btn`} onClick={() => setWorked(id, 'ci lavora')}>
          <i
            className={`${worked === 'ci lavora' ? 'fas' : 'far'} fa-circle`}
          />{' '}
          ci lavora
        </button>
      </div> */}
    </div>
  );
};

export default ProfileAction;
