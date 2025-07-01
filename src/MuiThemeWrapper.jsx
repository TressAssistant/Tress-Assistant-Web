import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

// This component wraps children with the MUI ThemeProvider
const MuiThemeWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

export default MuiThemeWrapper;
