import React from 'react';

import CircularSlider from '@fseehawer/react-circular-slider';

const InputCircularSlider = ({ label, value, onChange, color, bgColor}) => (
  <div className="flex flex-col items-center">
    <CircularSlider
      label={label}
      labelColor={color}
      knobColor={color}
      progressColorFrom={color}
      progressColorTo={color}
      trackColor={bgColor}
      min={0}
      max={359}
      width={100}
      data={Array.from({ length: 360 }, (_, i) => i)}
      dataIndex={value}
      valueFontSize="1rem"
      labelFontSize="1rem"
      appendToValue="°"
      onChange={onChange}
      labelBottom={true}
    />
  </div>
);

export default InputCircularSlider;
