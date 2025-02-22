import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import { store } from './store/store.ts';
import { Provider } from 'react-redux';

const container = document.getElementById('root');

if (container === null) {
  throw new Error('Root not found');
}

const root = createRoot(container);

root.render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
