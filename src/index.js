import React, { createContext } from "react";
import ReactDOM from 'react-dom/client';
import App from './containers/App/index';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
// API calls set up
import axios from "axios";
axios.defaults.withCredentials = false;
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// context
export const ConfigContext = createContext();
export const configValues = {
  path: "",
  error: "",
  message: ""
};

const root = ReactDOM.createRoot(document.getElementById('root'));
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

root.render(
  <BrowserRouter basename={baseUrl}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
