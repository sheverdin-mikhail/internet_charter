import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import App from './app/App';
import {store, persistor} from './app/store'
import { PersistGate } from 'redux-persist/integration/react';

import './app/styles/normalize.css'
import { setupListeners } from '@reduxjs/toolkit/dist/query';



const root = ReactDOM.createRoot(document.getElementById('root'));

setupListeners(store.dispatch)
root.render(
    
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter >
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
);
