import React from "react";

const DisplaySubHeader = ({ text, className = "" }) => (
  <div className={`text-lg josefin-bold text-primary mb-3 border-b-2 border-primary ${className}`}>
    {text}
  </div>
);

export default DisplaySubHeader;