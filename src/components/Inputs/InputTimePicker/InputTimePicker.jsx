import React from 'react';

import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';

// Helper to convert minutes to Date object (today's date)
function minutesToDate(minutes) {
  const date = new Date();
  date.setHours(Math.floor(minutes / 60));
  date.setMinutes(minutes % 60);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

// Helper to convert Date object to minutes
function dateToMinutes(date) {
  return date.getHours() * 60 + date.getMinutes();
}

const InputTimePicker = ({ value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        value={minutesToDate(value)}
        onChange={date => {
          if (date) onChange(dateToMinutes(date));
        }}
        renderInput={(params) => <TextField {...params} fullWidth />}
        ampm={false}
        sx={{
          width: '100%',
          backgroundColor: 'white',
        }}
      />
    </LocalizationProvider>
  );
};

export default InputTimePicker;
