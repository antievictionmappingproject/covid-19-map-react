import React from 'react';
import { useSelector } from 'react-redux';

export default props => {
  const showLoadingIndicator = useSelector(
    state => state.ui.showLoadingIndicator
  );

  //   the loading container
  if (!showLoadingIndicator) {
    return null;
  }
  return (
    <div id="loading-container">
      <div id="loader"></div>
    </div>
  );
};
