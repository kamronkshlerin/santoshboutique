import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { initSecurityShield } from './utils/securityShield'

initSecurityShield();

const mountNode = document.getElementById('santosh-root') || document.getElementById('root');
if (mountNode) {
  ReactDOM.createRoot(mountNode).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  console.error('Boutique mount node not found!');
}
