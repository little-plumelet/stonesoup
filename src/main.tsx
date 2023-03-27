import { ConfigProvider } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { AppCore } from './AppCore';
import './index.css';
import { THEME } from './constants';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: THEME,
      }}
    >
      <Provider store={store}>
        <AppCore />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
