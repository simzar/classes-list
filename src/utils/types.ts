import { IntlShape } from 'react-intl';

export interface WithIntlProp {
    intl: IntlShape;
}

export interface Student {
    id: string;
    name: string;
}