
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { HashRouter } from 'react-router-dom';

console.log("iExplain App: Initializing React root...");

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
