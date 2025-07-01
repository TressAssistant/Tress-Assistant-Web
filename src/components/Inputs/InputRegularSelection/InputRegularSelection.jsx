import React from 'react';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const InputRegularSelection = ({ options, value, onChange }) => {
  return (
    <FormControl fullWidth variant="outlined" size="small">
      <Select
        value={value}
        onChange={e => onChange(e.target.value)}
        sx={{
          backgroundColor: 'white',
        }}
        displayEmpty
      >
        {options.map(option => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default InputRegularSelection;
