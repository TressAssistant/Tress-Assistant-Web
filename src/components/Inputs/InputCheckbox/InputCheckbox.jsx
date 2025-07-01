import React from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';

const StyledFormControlLabel = styled(FormControlLabel)(({ theme, checked }) => ({
  margin: 0,
  borderRadius: theme.shape.borderRadius,
  border: `1.5px solid ${checked ? theme.palette.primary.main : theme.palette.grey[300]}`,
  background: checked ? theme.palette.primary.main + '10' : '#fff',
  color: checked ? theme.palette.primary.main : theme.palette.text.primary,
  fontWeight: checked ? 'bold' : 'normal',
  transition: 'border-color 0.2s, background 0.2s, color 0.2s',
  cursor: 'pointer',
  paddingRight: theme.spacing(1),
  '& .MuiFormControlLabel-label': {
    fontWeight: checked ? 'bold' : 'normal',
    color: checked ? theme.palette.primary.main : theme.palette.text.primary,
  },
}));

const InputCheckbox = ({ checked, onChange, label }) => {
  return (
    <StyledFormControlLabel
      control={<Checkbox checked={checked} onChange={e => onChange(e.target.checked)} color="primary" />}
      label={label}
      checked={checked}
    />
  );
};

export default InputCheckbox;
