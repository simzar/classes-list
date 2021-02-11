import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { IntlProvider } from 'react-intl';
import messages from './lang/en.json';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <IntlProvider locale="en" messages={messages.translations}>
            <App/>
        </IntlProvider>
    </React.StrictMode>,
    document.getElementById('root')
);