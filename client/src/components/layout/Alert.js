import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

// [cs]ptar: PropTypes.array.isRequired
Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

// [cs]reduxmap
const mapStateToProps = state => ({
  alerts: state.alert
});

// const mapDispatchToProps = {};

export default connect(mapStateToProps)(Alert);
