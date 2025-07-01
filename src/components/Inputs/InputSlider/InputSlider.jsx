import React from "react";

import Slider from "@mui/material/Slider";

export default function InputSlider({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  className = "",
  disabled = false
}) {
  return (
    <div className={`flex flex-col w-full bg-white rounded-lg shadow-sm p-2 ${className}`}>
      <div className="flex justify-between mb-1 text-sm text-gray-500">
        <span>{min}</span>
        <span className="font-semibold text-primary">
          Current: {value}
        </span>
        <span>{max}</span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(_, newValue) => onChange(Number(newValue))}
        disabled={disabled}
        size="small"
        sx={{
          color: 'primary.main',
          height: 6,
          '& .MuiSlider-thumb': {
            width: 16,
            height: 16,
            boxShadow: 1,
          },
        }}
      />
    </div>
  );
}
