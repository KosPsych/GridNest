import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import App from './App';



ReactDOM.render(
    
  <BrowserRouter>
  <App/>
  </BrowserRouter>,
document.getElementById("root"));