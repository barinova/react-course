import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@components/ThemeSwitcher/ThemeContext';
import { store } from '@store/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <StrictMode>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </StrictMode>
    </Provider>
  );
}
