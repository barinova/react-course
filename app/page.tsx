'use client';

import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import { ThemeProvider } from '@components/ThemeSwitcher/ThemeContext';
import { store } from '@store/store';
import Layout from '@components/Layout/Layout';
import '@styles/globals.css';

export default function RootPage() {
  return (
    <Provider store={store}>
      <StrictMode>
        <ThemeProvider>
          <Layout></Layout>
        </ThemeProvider>
      </StrictMode>
    </Provider>
  );
}
