import React from 'react';

import TextField from '@mui/material/TextField';

const InputNumber = ({ value, onChange, min, max, step = 1, ...props }) => {
  return (
    <TextField
      type="number"
      value={value}
      onChange={e => onChange(parseFloat(e.target.value))}
      inputProps={{ min, max, step }}
      variant="outlined"
      sx={{
        width: '100%',
        backgroundColor: 'white',
      }}
      size="small"
      {...props}
    />
  );
};

export default InputNumber;
