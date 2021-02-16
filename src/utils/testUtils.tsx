import React from 'react'
import { render } from '@testing-library/react'
import { injectIntl, IntlProvider } from 'react-intl';
import { BrowserRouter as Router } from 'react-router-dom';
import messages from '../lang/en.json';

export const renderWithProviders = (Component: React.ComponentType<any>, props: any = {}, locale = "en") =>
    render(
        <IntlProvider locale={locale} messages={messages.translations}>
            <Router>
                <Component {...props} />
            </Router>
        </IntlProvider>
    );

export const renderWithInjectedIntl = (component: React.ComponentType<any>, props: any = {}, locale = "en") =>
    renderWithProviders(injectIntl(component), props, locale);