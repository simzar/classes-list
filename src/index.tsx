import React from 'react';
import ReactDOM from 'react-dom';
import { StylesProvider } from '@material-ui/core/styles';
import { IntlProvider } from 'react-intl';
import messages from './lang/en.json';
import App from './components/App';
import './index.scss';

ReactDOM.render(
    <React.StrictMode>
        <IntlProvider locale="en" messages={messages.translations}>
            <StylesProvider injectFirst>
                <App/>
            </StylesProvider>
        </IntlProvider>
    </React.StrictMode>,
    document.getElementById('root')
);