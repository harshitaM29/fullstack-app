import React from 'react';
import ReactDOM from 'react-dom/client';

import {StrictMode} from 'react';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store/index';
import '../node_modules/react-bootstrap/dist/react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
            <BrowserRouter>
            <Provider store={store}>
            
            <App />
           
            </Provider>
            </BrowserRouter>
            </StrictMode>
            );
