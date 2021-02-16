import React from 'react'
import { render } from '@testing-library/react'
import { IntlProvider } from 'react-intl';

export const renderWithIntl = (Component: React.ComponentType<any>, props: any = {}, locale = "en") => {
    return render(
        <IntlProvider locale={locale}>
            <Component {...props} />
        </IntlProvider>
    );
}

export const renderWithMockedIntlProp = (component: React.ComponentType<any>, props: any = {}, locale = "en") =>
    renderWithIntl(component, { intl: { formatMessage: (({ id }: { id: string }) => id) }, ...props}, locale);