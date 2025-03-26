import React from 'react';
import ReactDOM from 'react-dom/client';  // Certifique-se de importar do 'react-dom/client'
import App from './App'; 
import './index.css'; 
import reportWebVitals from './reportWebVitals'; 

const root = ReactDOM.createRoot(document.getElementById('root'));  // Cria o root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
