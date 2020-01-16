import React from 'react';
import PropTypes from 'prop-types';

const SidebarButton = props => {
  const handleSidebar = () => {
    // document.querySelector('.button').addEventListener('click', () => {
    document.querySelector('.container').classList.toggle('isOpen');
    //   });
  };

  return (
    <a class="btn-sidebar" onClick={handleSidebar}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <line x1="0" y1="20" x2="100" y2="20" />
        <line x1="0" y1="50" x2="100" y2="50" />
        <line x1="0" y1="80" x2="100" y2="80" />
      </svg>
    </a>
  );
};

SidebarButton.propTypes = {};

export default SidebarButton;
