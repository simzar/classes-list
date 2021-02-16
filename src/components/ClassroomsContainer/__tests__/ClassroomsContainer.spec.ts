import { fireEvent, waitForElementToBeRemoved, findByText as globalFindByText } from '@testing-library/react';
import ClassroomsContainer from '../ClassroomsContainer';
import { renderWithProviders } from '../../../utils/testUtils';
import * as utils from '../../../utils';

jest.mock('localforage', () => ({
    keys: () => ['1A', '2B', '3C'],
    getItem: (name: string) => !name || name === 'error' || name === 'NEW'
        ? null
        : ({
            id: '1',
            name,
            students: [
                { id: '1', name: 'Ada Lovelace' },
                { id: '2', name: 'Archimedes' },
                { id: '3', name: 'Alan Turing' }
            ]
        }),
    setItem: (name: string, item: any) => item
}));
jest.mock('uuid', () => ({ v4: () => 'new-id' }));

describe('ClassroomsList', () => {

    const renderComponent = () => renderWithProviders(ClassroomsContainer);

    beforeAll(() => {
        (utils.sleep as jest.Mock) = jest.fn();
    });

    it('should fetch and render classrooms and the initial "Select classroom" message', async () => {
        const { findByText } = renderComponent();

        await findByText('1A');
        await findByText('2B');
        await findByText('3C');
        await findByText('Create or select a classroom');
    });

    it('should navigate to a classroom and list students', async () => {
        const { findByText, findAllByText } = renderComponent();
        const classroomButton = await findByText('2B');

        fireEvent.click(classroomButton);

        await findByText('3 students');
        const classroomNames = await findAllByText('2B');
        expect(classroomNames.length).toEqual(2);
        await findByText('Ada Lovelace');
        await findByText('Archimedes');
        await findByText('Alan Turing');
    });

    it('should create a new classroom', async () => {
        const { findByText, getByText, findByPlaceholderText } = renderComponent();
        await findByText('1A');

        const { parentElement: addButton } = getByText('add.svg');
        fireEvent.click(addButton as HTMLButtonElement);

        const inputField = await findByPlaceholderText('Add Class');
        fireEvent.change(inputField, { target: { value: 'new' } });
        fireEvent.keyDown(inputField, { key: 'Enter' });

        await findByText('NEW');
    });

    it('should create a new student', async () => {
        const { findByText, findByPlaceholderText } = renderComponent();
        const inputField = await findByPlaceholderText('Add Student');

        fireEvent.change(inputField, { target: { value: 'New Student' } });
        fireEvent.keyDown(inputField, { key: 'Enter' });

        await findByText('New Student');
    });

    it('should remove a student', async () => {
        const { findByText, findAllByText, queryByText } = renderComponent();
        const classroomButton = await findByText('1A');
        fireEvent.click(classroomButton);
        await findByText('Ada Lovelace');

        const [{ parentElement: firstRemoveButton }] = await findAllByText('remove.svg');
        fireEvent.click(firstRemoveButton as HTMLButtonElement);

        await waitForElementToBeRemoved(() => queryByText('Ada Lovelace'));
    });

    it('should move a student to another classroom', async () => {
        const { findByText, findAllByText, queryByText } = renderComponent();
        const classroomButton = await findByText('3C');
        fireEvent.click(classroomButton);
        await findByText('Ada Lovelace');

        const [{ parentElement: firstMoveButton }] = await findAllByText('move.svg');
        fireEvent.click(firstMoveButton as HTMLButtonElement);

        const { parentElement: moveStudentDropdown } = await findByText('Move to');
        const anotherClassroomMenuItem = await globalFindByText(moveStudentDropdown as HTMLElement, '1A');
        fireEvent.click(anotherClassroomMenuItem);

        await waitForElementToBeRemoved(() => queryByText('Ada Lovelace'));
    });
});