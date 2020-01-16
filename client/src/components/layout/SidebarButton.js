import React from 'react';
import PropTypes from 'prop-types';

const SidebarButton = props => {
  const handleSidebar = () => {
    // document.querySelector('.button').addEventListener('click', () => {
    document.querySelector('.container').classList.toggle('isOpen');
    //   });
  };

  return (
    <div className="btn-sidebar" onClick={handleSidebar}>
      <div className="btn-line"></div>
      <div className="btn-line"></div>
      <div className="btn-line"></div>
    </div>
  );
};

SidebarButton.propTypes = {};

export default SidebarButton;
