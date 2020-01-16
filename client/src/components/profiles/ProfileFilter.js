import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FilterFavorite from './FilterFavorite';
import FilterInterview from './FilterInterview';
import FilterWorked from './FilterWorked';
import FilterStars from './FilterStars';
import OrderDate from './OrderDate';
import OrderName from './OrderName';
import OrderDistance from './OrderDistance';
import OrderSkill from './OrderSkill';
import OrderExperience from './OrderExperience';
import OrderEducation from './OrderEducation';

const ProfileFilter = ({ allProfiles, profili, setProfili }) => {
  const [data, setData] = useState({});
  const [favoriteFilter, setFavoriteFilter] = useState(0);
  const [interviewFilter, setInterviewFilter] = useState(0);
  const [starsFilter, setStarsFilter] = useState(-1);
  const [workedFilter, setWorkedFilter] = useState('');
  const [sortBy, setSortBy] = useState({});

  const onChange = e => setData({ ...data, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    profili = JSON.parse(allProfiles);
    console.log(profili);
    let result;

    result = data.status ? filterByStatus(profili, data.status) : profili;

    if (data.name) {
      result = filterByName(result, data.name);
    }

    if (data.address) {
      result = filterByAddress(result, data.address);
    }

    result = favoriteFilter ? filterByFavorite(result, favoriteFilter) : result;
    result = interviewFilter ? filterByInterviewed(result, interviewFilter) : result;
    result = filterByStars(result, starsFilter);
    result = workedFilter ? filterByWorked(result, workedFilter) : result;

    if (data.skills) {
      console.log(123);
      result = filterBySkills(result, data.skills);
    }

    switch (sortBy.type) {
      case 'date':
        result = sortByDate(result, sortBy.dir);
        break;
      case 'name':
        result = sortByName(result, sortBy.dir);
        break;
      case 'distance':
        result = sortByDistance(result, sortBy.dir);
        break;
      case 'skills':
        result = sortBySkills(result, sortBy.dir);
        break;
      case 'experience':
        result = sortByExperience(result, sortBy.dir);
        break;
      case 'education':
        result = sortByEducation(result, sortBy.dir);
        break;
      default:
        break;
    }

    setProfili(result);
    // setData({});
  };

  /// FILTER BY STATUS
  const filterByStatus = (obj, status) => {
    return obj.filter(item => item.status.includes(status));
  };

  /// FILTER BY NAME
  const filterByName = (obj, name) => {
    return name
      ? obj.filter(item => {
          return RegExp(name, 'gi').test(item.user.name);
        })
      : obj;
  };

  /// FILTER BY ADDRESS
  const filterByAddress = (obj, address) => {
    return address
      ? obj.filter(item => {
          return RegExp(address, 'gi').test(item.address);
        })
      : obj;
  };

  /// FILTER BY FAVORITE
  const filterByFavorite = (obj, filter) => {
    return obj.filter(item => item.isFavorite === filter);
  };

  /// FILTER BY INTERVIEW
  const filterByInterviewed = (obj, filter) => {
    return obj.filter(item => item.isInterviewed === filter);
  };

  // const filterByInterviewed = (obj, interviewFilter) => {
  //   switch (interviewFilter) {
  //     case 'interviewed':
  //       return obj.filter(item => item.isInterviewed === true);
  //     case 'notInterviewed':
  //       return obj.filter(item => item.isInterviewed === false);
  //     default:
  //       return obj;
  //   }
  // };

  /// FILTER BY STARS
  const filterByStars = (obj, starsFilter) => {
    return starsFilter >= 0
      ? obj.filter(item => item.stars === starsFilter)
      : obj;
  };

  /// FILTER BY WORKED
  const filterByWorked = (obj, filter) => {
    return obj.filter(item => item.worked === filter);
  };

  /// FILTER BY SKILL
  const filterBySkills = (obj, strFilter) => {
    if (!strFilter) {
      return obj;
    }
    const arrFilter = strFilter
      .toLowerCase()
      .split(',')
      .map(skill => skill.trim());

    const filtered = obj.filter(item =>
      arrFilter.some(r =>
        item.skills
          .join()
          .toLowerCase()
          .includes(r)
      )
    );

    const regexFilter = strFilter.replace(',', '|');
    const regex = new RegExp(regexFilter, 'gi');
    const profilesFiltered = filtered.map(item => {
      item.skills = item.skills
        .join()
        .replace(regex, item => `*${item}`)
        .split(',');
      return item;
    });
    return profilesFiltered;
  };

  /// ORDINA PER DATA
  const sortByDate = (obj, sortDate) => {
    return obj.sort((a, b) => {
      switch (sortDate) {
        case 'asc':
          return new Date(a.date) - new Date(b.date); // dal - recente al + recente
        case 'desc':
          return new Date(b.date) - new Date(a.date); // dal + recente al - recente
      }
    }); /// dal + recente al - recente
  };

  /// ORDINA PER NAME
  const sortByName = (obj, sortDir) => {
    return obj.sort((a, b) => {
      const nameA = a.user.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.user.name.toUpperCase(); // ignore upper and lowercase
      switch (sortDir) {
        case 'asc':
          return nameA < nameB ? -1 : nameA > nameB ? 1 : 0; // da A a Z
        case 'desc':
          return nameA > nameB ? -1 : nameA < nameB ? 1 : 0; // da Z a A
      }
    }); /// dal + recente al - recente
  };

  /// ORDINA PER DISTANCE
  const sortByDistance = (obj, sortDir) => {
    return obj.sort((a, b) => {
      switch (sortDir) {
        case 'asc':
          return a.distance === 0 || b.distance === 0
            ? -1
            : a.distance - b.distance; // da 1 a >1
        case 'desc':
          return a.distance === 0 || b.distance === 0
            ? -1
            : b.distance - a.distance; // da >1 a 0
      }
    }); /// dal + recente al - recente
  };

  /// ORDINA PER SKILLS
  const sortBySkills = (obj, sortDir) => {
    return obj.sort((a, b) => {
      switch (sortDir) {
        case 'asc':
          return a.skills.length - b.skills.length; // da 0 a >0
        case 'desc':
          return b.skills.length - a.skills.length; // da >0 a 0
      }
    }); /// dal + recente al - recente
  };

  /// ORDINA PER EXPERIENCE
  const sortByExperience = (obj, sortDir) => {
    return obj.sort((a, b) => {
      switch (sortDir) {
        case 'asc':
          return a.experience.length - b.experience.length; // da 0 a >0
        case 'desc':
          return b.experience.length - a.experience.length; // da >0 a 0
      }
    });
  };

  /// ORDINA PER EDUCATION
  const sortByEducation = (obj, sortDir) => {
    return obj.sort((a, b) => {
      switch (sortDir) {
        case 'asc':
          return a.education.length - b.education.length; // da 0 a >0
        case 'desc':
          return b.education.length - a.education.length; // da >0 a 0
      }
    });
  };

  return (
    <>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="group-search filter">
          <p className="lead">
            <i className="fas fa-filter" /> Filtra i profili per:
          </p>
          <div className="form-group">
            <select
              name="status"
              value={data.status ? data.status : ''}
              onChange={e => onChange(e)}
            >
              <option value="">Tutti</option>
              <option value="Manager">Manager</option>
              <option value="Programmatore">Programmatore</option>
              <option value="Sistemista">Sistemista</option>
              <option value="Commerciale">Commerciale</option>
              <option value="Altro">Altro</option>
            </select>
            <small className="form-text">seleziona un campo di lavoro</small>
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Nome"
              name="name"
              value={data.name ? data.name : ''}
              onChange={e => onChange(e)}
            />
            <small className="form-text">cerca per nome</small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Indirizzo"
              name="address"
              value={data.address ? data.address : ''}
              onChange={e => onChange(e)}
            />
            <small className="form-text">cerca per via/comune/provincia</small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Competenze"
              name="skills"
              value={data.skills ? data.skills : ''}
              onChange={e => onChange(e)}
            />
            <small className="form-text">
              cerca per competenze(es. HTML,CSS,PHP)
            </small>
          </div>
          <div className="group-flex-btn">
            <FilterFavorite
              favoriteFilter={favoriteFilter}
              setFavoriteFilter={setFavoriteFilter}
            />
            <FilterInterview
              interviewFilter={interviewFilter}
              setInterviewFilter={setInterviewFilter}
            />
            <FilterStars
              starsFilter={starsFilter}
              setStarsFilter={setStarsFilter}
            />
            <FilterWorked
              workedFilter={workedFilter}
              setWorkedFilter={setWorkedFilter}
            />
          </div>
        </div>
        <div className="group-search order">
          <p className="lead">
            <i className="fas fa-sort-amount-down-alt" /> Ordina i profili per:
          </p>
          <div className="group-flex-btn">
            <OrderDate sortBy={sortBy} setSortBy={setSortBy} />
            <OrderName sortBy={sortBy} setSortBy={setSortBy} />
            <OrderDistance sortBy={sortBy} setSortBy={setSortBy} />
            <OrderSkill sortBy={sortBy} setSortBy={setSortBy} />
            <OrderExperience sortBy={sortBy} setSortBy={setSortBy} />
            <OrderEducation sortBy={sortBy} setSortBy={setSortBy} />
          </div>
        </div>
        <div className="group-search order">
          <button
            className="btn btn-light"
            onClick={() => {
              setData({});
              setFavoriteFilter(null);
              setInterviewFilter('all');
              setStarsFilter(-1);
              setWorkedFilter('');
            }}
          >
            <i className="fas fa-sync" />
          </button>
          <input type="submit" className="btn btn-primary my-1" />
        </div>
      </form>
      <pre>{JSON.stringify(sortBy, null, 2)}</pre>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

ProfileFilter.propTypes = {
  allProfiles: PropTypes.string.isRequired,
  setProfili: PropTypes.func.isRequired,
  profili: PropTypes.array.isRequired
};

export default ProfileFilter;
