import { createTheme } from '@mui/material/styles';

// Tailwind primary color palette
const primary = {
  50: '#f0f3e8',
  100: '#e0e7d1',
  200: '#c1d19f',
  300: '#a2bb6d',
  400: '#83a43b',
  500: '#707c3e', // DEFAULT
  600: '#5c6432',
  700: '#484b26',
  800: '#343f1a',
  900: '#202f0d',
  950: '#101f05',
};

const theme = createTheme({
  palette: {
    primary: {
      light: primary[200],
      main: primary[500],
      dark: primary[700],
      contrastText: '#fff',
    },
  },
});

export default theme;
