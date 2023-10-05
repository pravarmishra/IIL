import { CircularProgress } from '@mui/material';
import React from 'react';

const OpaqueLoading = () => {
  const eventDisabler = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="opaqueLoading" onClick={eventDisabler}>
      <CircularProgress color="primary" />
    </div>
  );
};

export default OpaqueLoading;
