import React from 'react';
import App from '../App';
import { render, screen } from '@testing-library/react';

describe('Home', () => {
    it('should say hi', () => {
        render(<App/>);

        const textWrapper = screen.getByText('Hi');

        expect(textWrapper).toBeInTheDocument();
    });
});
