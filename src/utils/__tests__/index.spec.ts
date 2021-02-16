import { compareStudents, executeOnEnter, naivelyCompareClassrooms } from '../index';
import { Student } from '../types';
import { HTMLProps } from 'react';

describe('naivelyCompareClassrooms', () => {
    it.each([
        [-1, 'A', 'B'],
        [1, 'Z', 'A'],
        [0, 'AB52', 'AB52'],
        [1, '12C', '1A'],
        [-1, '2C', '20A'],
        [-1, '2C', '2D'],
    ])('should return %d when comparing "%s" and "%s"', (result, a, b) => {
       expect(naivelyCompareClassrooms(a, b)).toEqual(result);
    });
});

describe('compareStudents', () => {
    it.each([
        [-1, { name: 'Adam', id: 'not-important' }, { name: 'Eve', id: 'not-important' }],
        [0, { name: 'Adam', id: 'not-important' }, { name: 'Adam', id: 'not-important' }],
        [-1, { name: 'ADAM', id: 'not-important' }, { name: 'eve', id: 'not-important' }],
        [1, { name: 'Randy', id: 'not-important' }, { name: 'eve', id: 'not-important' }],
        [1, { name: 'Randy', id: 'not-important' }, { name: 'EVE', id: 'not-important' }],
        [1, { name: 'randy', id: 'not-important' }, { name: 'EVE', id: 'not-important' }],
        [1, { name: null, id: 'not-important' }, { name: 'EVE', id: 'not-important' }],
        [0, { name: null, id: 'not-important' }, { name: null, id: 'not-important' }],
    ])("should return %d when comparing '%s' and '%s'", (result, a, b) => {
        expect(compareStudents(a as Student, b as Student)).toEqual(result);
    });
});

describe('executeOnEnter', () => {
    it('should execute given function if event is "Enter"', () => {
        const action = jest.fn();
        const event = new KeyboardEvent('keydown', { key: 'Enter' });

        executeOnEnter(event as any as HTMLProps<KeyboardEvent>, action);

        expect(action).toHaveBeenCalledTimes(1);
    });

    it('should not execute given function if event is not "Enter"', () => {
        const action = jest.fn();
        const event = new KeyboardEvent('keydown', { key: 'any other' });

        executeOnEnter(event as any as HTMLProps<KeyboardEvent>, action);

        expect(action).toHaveBeenCalledTimes(0);
    });
});