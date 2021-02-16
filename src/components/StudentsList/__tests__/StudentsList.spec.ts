import { fireEvent } from '@testing-library/react';
import StudentsList, { StudentsListProps } from '../StudentsList';
import { renderWithInjectedIntl } from '../../../utils/testUtils';

describe('StudentsList', () => {
    const studentsList = [
        { id: '1', name: 'Marie Curie' },
        { id: '2', name: 'Ada Lovelace' },
        { id: '3', name: 'Nikola Tesla' },
        { id: '4', name: 'Pythagoras' },
    ];
    const defaultProps: Omit<StudentsListProps, 'intl'> = {
        addStudent: jest.fn(),
        classroomName: '1A',
        classrooms: ['1A', '2B', '3C', '4D'],
        fetchClassroom: jest.fn().mockResolvedValue({ students: studentsList }),
        moveStudent: jest.fn(),
        removeStudent: jest.fn(),
    };

    const renderComponent = (props: Partial<StudentsListProps> = {}) =>
        renderWithInjectedIntl(StudentsList, {...defaultProps, ...props});

    it('should load and display students list', async () => {
        const fetchClassroom = jest.fn().mockResolvedValue({ students: studentsList });
        const { findByText } = renderComponent({ fetchClassroom });

        for (const student of studentsList) {
            await findByText(student.name);
        }
        await findByText('4 students');
    });

    it('should render empty class message', async () => {
        const fetchClassroom = jest.fn().mockResolvedValue(null);
        const { findByText } = renderComponent({ fetchClassroom });

        await findByText('0 students');
        await findByText('Create or select a classroom');
    });

    it('should insert a new student', async () => {
        const fetchClassroom = jest.fn().mockResolvedValue({
            students: studentsList.slice(0, 3),
        });
        const addStudent = jest.fn().mockResolvedValue({
            students: studentsList
        });
        const { findByPlaceholderText, findByText } = renderComponent({ addStudent, fetchClassroom });

        const inputField = await findByPlaceholderText('Add Student');
        fireEvent.change(inputField, { target: { value: 'any name' } });
        fireEvent.keyDown(inputField, { key: 'Enter' });

        await findByText('Pythagoras');
        expect(addStudent).toHaveBeenCalledWith('1A', { studentName: 'any name' });
    });

    it('should display error if inserting a student fails', async () => {
        const fetchClassroom = jest.fn().mockResolvedValue({
            students: studentsList.slice(0, 3),
        });
        const addStudent = jest.fn().mockRejectedValue(new Error('error message'));
        const { findByPlaceholderText, findByText } = renderComponent({ addStudent, fetchClassroom });

        const inputField = await findByPlaceholderText('Add Student');
        fireEvent.change(inputField, { target: { value: 'any name' } });
        fireEvent.keyDown(inputField, { key: 'Enter' });

        await findByText('error message');
    });

    it('should remove a student', async () => {
        const fetchClassroom = jest.fn().mockResolvedValue({
            students: studentsList,
        });
        const removeStudent = jest.fn().mockResolvedValue({
            students: []
        });
        const { findAllByText } = renderComponent({ removeStudent, fetchClassroom });

        const [firstStudentRemoveButton] = await findAllByText('remove.svg');

        fireEvent.click(firstStudentRemoveButton);

        expect(removeStudent).toBeCalledWith('1A', '1');
    });

    const originalConsoleError = console.error;
    beforeAll(() => {
        console.error = jest.fn();
    });

    afterAll(() => {
        console.error = originalConsoleError;
    });
});