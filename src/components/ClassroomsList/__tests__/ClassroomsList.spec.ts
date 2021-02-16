import { fireEvent, waitFor } from '@testing-library/react';
import ClassroomsList, { ClassroomsListProps } from '../ClassroomsList';
import { renderWithInjectedIntl } from '../../../utils/testUtils';

describe('ClassroomsList', () => {
    const defaultProps: Omit<ClassroomsListProps, 'intl'> = {
        addClassroom: jest.fn(),
        classrooms: ['1A', '2B', '3C'],
        isLoading: false
    };

    const renderComponent = (props: Partial<ClassroomsListProps> = {}) =>
        renderWithInjectedIntl(ClassroomsList, {...defaultProps, ...props});

    it('should render given classrooms', async () => {
        const { findByText } = renderComponent();

        for (const classroom of defaultProps.classrooms) {
            await findByText(classroom);
        }
    });

    it('should insert new classroom', async () => {
        const addClassroom = jest.fn();
        const { findByPlaceholderText, getByText } = renderComponent({ addClassroom });

        const { parentElement: addButton } = getByText('add.svg');
        fireEvent.click(addButton as HTMLButtonElement);

        const inputField = await findByPlaceholderText('Add Class');
        fireEvent.change(inputField, { target: { value: 'new class name' } });
        fireEvent.keyDown(inputField, { key: 'Enter' });

        await waitFor(() => {
            expect(addClassroom).toHaveBeenCalledWith({ name: 'NEW CLASS NAME' });
        });
    });

    it('should display error if inserting a classroom fails', async () => {
        const addClassroom = jest.fn().mockRejectedValue(new Error('error message'));
        const { findByPlaceholderText, findByText, getByText } = renderComponent({ addClassroom });

        const { parentElement: addButton } = getByText('add.svg');
        fireEvent.click(addButton as HTMLButtonElement);

        const inputField = await findByPlaceholderText('Add Class');
        fireEvent.change(inputField, { target: { value: 'new class name' } });
        fireEvent.keyDown(inputField, { key: 'Enter' });

        await findByText('error message');
    });

    const originalConsoleError = console.error;
    beforeAll(() => {
        console.error = jest.fn();
    });

    afterAll(() => {
        console.error = originalConsoleError;
    });
});