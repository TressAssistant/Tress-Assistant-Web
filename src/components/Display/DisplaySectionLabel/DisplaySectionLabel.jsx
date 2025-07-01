import React from 'react';

const DisplaySectionLabel = ({ title, description, className = '' }) => (
  <div className={`mb-2 ${className}`.trim()}>
    <div className="font-medium text-gray-700">
      {title}
    </div>
    {description && (
      <div className="text-sm text-gray-500 mt-1 mb-2">
        {description}
      </div>
    )}
  </div>
);

export default DisplaySectionLabel;
