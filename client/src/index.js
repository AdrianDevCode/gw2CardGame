import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';

const rootEl = document.getElementById('root');

  ReactDOM.render(<Router><App /></Router>,rootEl);
