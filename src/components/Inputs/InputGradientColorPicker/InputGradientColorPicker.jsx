import React, { useState } from "react";

import Popover from "@mui/material/Popover";

import ColorPicker from 'react-best-gradient-color-picker'

export default function InputGradientColorPicker({ value, onChange }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClick}
        className="w-full h-10 rounded border border-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-0 focus-within:ring-2 focus-within:ring-primary-500 cursor-pointer"
      >
        <span
          className="inline-block w-full h-full rounded"
          style={{ background: value }}
        />
      </button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{
          style: {
            minWidth: 340,
            padding: '1rem',
          },
        }}
      >
        <ColorPicker value={value} onChange={onChange} />
      </Popover>
    </div>
  );
}
