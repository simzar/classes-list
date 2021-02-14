import { HTMLProps } from 'react';
import { ClassroomPreview } from './types';

export const sleep = (ms: number = 1200) =>
    new Promise(resolve => setTimeout(resolve, ms));

export const naivelyCompareClassrooms = (a: ClassroomPreview, b: ClassroomPreview) => {
    if (a === b) {
        return 0;
    }

    const aYear = parseInt(a);
    const bYear = parseInt(b);

    if (!aYear || !bYear || aYear === bYear) {
        return a < b ? -1 : 1;
    }

    return aYear < bYear ? -1 : 1;
};

export const executeOnEnter = (event: HTMLProps<KeyboardEvent>, fn: Function) => {
    event.key === 'Enter' && fn();
};