import { fireEvent } from '@testing-library/react';
import StudentsListItem, { StudentsListItemProps } from '../StudentsListItem';
import { renderWithMockedIntlProp } from '../../../utils/testUtils';

describe('StudentsListItem', () => {
    const defaultProps: Omit<StudentsListItemProps, 'intl'> = {
        handleMoveClick: jest.fn().mockResolvedValue(null),
        handleRemoveClick: jest.fn().mockResolvedValue(null),
        id: 'studentId',
        moveToOptions: ['1D', '3C', '4A'],
        name: 'student name'
    };

    const renderComponent = (props: Partial<StudentsListItemProps> = {}) =>
        renderWithMockedIntlProp(StudentsListItem, {...defaultProps, ...props});

    it('should disable move and remove actions while removing a student', () => {
        const handleRemoveClick = jest.fn().mockReturnValue(new Promise(() => {}));
        const { getByTitle, queryByText } = renderComponent({ handleRemoveClick });
        const removeButton = getByTitle('studentsList.alt.remove').parentElement as HTMLButtonElement;
        const moveButton = getByTitle('studentsList.alt.moveTo').parentElement as HTMLButtonElement;

        fireEvent.click(removeButton);

        expect(handleRemoveClick).toHaveBeenCalledWith('studentId');
        expect(handleRemoveClick).toHaveBeenCalledTimes(1);

        fireEvent.click(removeButton);
        expect(handleRemoveClick).toHaveBeenCalledTimes(1);

        // Move button click should open the 'Move to' select menu
        fireEvent.click(moveButton);
        expect(queryByText('studentsList.moveTo')).not.toBeInTheDocument();
    });

    it('should disable move and remove actions while moving a student', () => {
        const handleMoveClick = jest.fn().mockReturnValue(new Promise(() => {}));
        const handleRemoveClick = jest.fn();
        const { getByTitle, getByText } = renderComponent({ handleMoveClick, handleRemoveClick });
        const moveButton = getByTitle('studentsList.alt.moveTo').parentElement as HTMLButtonElement;
        const removeButton = getByTitle('studentsList.alt.remove').parentElement as HTMLButtonElement;

        fireEvent.click(moveButton);
        fireEvent.click(getByText('4A'));

        expect(handleMoveClick).toHaveBeenCalledWith('4A');
        expect(handleMoveClick).toHaveBeenCalledTimes(1);

        fireEvent.click(removeButton);
        expect(handleRemoveClick).toHaveBeenCalledTimes(0);
    });
});