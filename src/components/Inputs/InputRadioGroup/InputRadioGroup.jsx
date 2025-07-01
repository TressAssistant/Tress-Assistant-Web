import React from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';

const StyledFormControlLabel = styled(FormControlLabel)(({ theme, checked }) => ({
  margin: 0,
  borderRadius: theme.shape.borderRadius,
  border: `1.5px solid ${checked ? theme.palette.primary.main : theme.palette.grey[300]}`,
  background: checked ? theme.palette.primary.main + '10' : '#fff',
  color: checked ? theme.palette.primary.main : theme.palette.text.primary,
  transition: 'border-color 0.2s, background 0.2s, color 0.2s',
  cursor: 'pointer',
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
  '&.Mui-focused': {
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
    borderColor: theme.palette.primary.main,
  },
  paddingRight: theme.spacing(1),
  '& .MuiFormControlLabel-label': {
    fontWeight: checked ? 'bold' : 'normal',
    color: checked ? theme.palette.primary.main : theme.palette.text.primary,
  },
}));

const InputRadioGroup = ({ options, value, onChange }) => {
  return (
    <FormControl component="fieldset">
      <RadioGroup
        row
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
        sx={{ gap: 2 }}
      >
        {options.map((option) => (
          <StyledFormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio color="primary" />}
            label={option.label}
            checked={value === option.value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default InputRadioGroup;
