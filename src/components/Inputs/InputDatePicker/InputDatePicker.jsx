import React from 'react';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const InputDatePicker = ({ value, onChange }) => {
  // value is expected to be a string in 'YYYY-MM-DD' format
  const dateValue = value ? new Date(value) : null;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        value={dateValue}
        onChange={date => {
          if (date) {
            const iso = date.toISOString().slice(0, 10);
            onChange(iso);
          } else {
            onChange('');
          }
        }}
        size="small"
        sx={{
          width: '100%',
          backgroundColor: 'white',
        }}
      />
    </LocalizationProvider>
  );
};

export default InputDatePicker;
