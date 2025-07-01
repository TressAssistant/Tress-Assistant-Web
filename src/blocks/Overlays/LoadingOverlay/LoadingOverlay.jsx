import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';

function LoadingOverlay() {
  return (
    <div className="absolute inset-0 w-screen h-screen bg-primary text-white flex items-center justify-center z-10">
      <div className="flex flex-col items-center justify-center">
        <div className="flex justify-center">
          <img
            src="/images/logo-with-text.png"
            alt="Logo"
            className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
            style={{ maxHeight: '500px', width: '100%', height: 'auto' }}
          />
        </div>
        <div className="flex justify-center my-6">
          <CircularProgress size={48} color="inherit" />
        </div>
        <div className="text-xl flex justify-center">
          Loading Resources
        </div>
      </div>
    </div>
  );
}

export default LoadingOverlay;
