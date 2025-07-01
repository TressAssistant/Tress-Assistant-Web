import React, { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import { MDXProvider } from '@mdx-js/react';

import HomePage from './pages/HomePage';

import DisplaySubHeader from './components/Display/DisplaySubHeader';

import './styles/style.css'
import MuiThemeWrapper from './MuiThemeWrapper';

const components = { DisplaySubHeader };

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MuiThemeWrapper>
      <MDXProvider components={components}>
        <HomePage />
      </MDXProvider>
    </MuiThemeWrapper>
  </StrictMode>,
)
