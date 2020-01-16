import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { getLogs } from '../../actions/log';

const Logs = ({ log, getLogs }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getLogs();
    if (!log.loading) {
      console.log(log.logs);
      setLogs(log.logs);
    }
  }, [log.loading]);

  // if (logs > 0) {
  //   console.log(123);
  // }

  return (
    <>
      <h2 className="my-2">Logs</h2>
      <div className="logs">
        <div className="row">
          <div className="th">Text</div>
          <div className="th hide-sm">Type</div>
          <div className="th hide-sm">Data</div>
        </div>
        {logs.length > 0 &&
          logs.map(log => (
            <Link to={`logs/${log._id}`} key={log._id} className="row">
              <div className="td">{log.text}</div>
              <div className="td hide-sm">{log.type}</div>
              <div className="td hide-sm">
                <Moment format="YYYY/MM/DD">{log.date}</Moment>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

Logs.propTypes = {
  getLogs: PropTypes.func.isRequired,
  log: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  log: state.log
});

export default connect(mapStateToProps, { getLogs })(Logs);
