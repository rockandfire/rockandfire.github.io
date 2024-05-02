import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import { MetaMaskUIProvider } from '@metamask/sdk-react-ui';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    <MetaMaskUIProvider sdkOptions={{
        dappMetadata: {
          name: 'React Demo Button',
          url: 'http://localhost:3000'
        },
        checkInstallationImmediately: false
      }}
      >
      <App />
    </MetaMaskUIProvider>
  </>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();