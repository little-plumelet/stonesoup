import { ConfigProvider } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ff642f',
          colorInfo: '#ff642f',
          colorError: '#ff1b1f',
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
