import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './state/store'
import App from './app'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
       <App />
    </Provider>
  </React.StrictMode>
);