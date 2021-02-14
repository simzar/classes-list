import { IntlShape } from 'react-intl';

export interface WithIntlProp {
    intl: IntlShape;
}

export interface Student {
    id: string;
    name: string;
}

export interface Classroom {
    id: string;
    name: string;
    students: Student[];
}

export type ClassroomPreview = string;

export interface StudentFormValues {
    name: string;
}
export type ClassroomFormValues = StudentFormValues;