import { fireEvent } from '@testing-library/react';
import SelectMenu, { SelectMenuProps } from '../SelectMenu';
import { renderWithIntl } from '../../../utils/testUtils';

describe('SelectMenu', () => {
    const defaultProps: SelectMenuProps = {
        anchorElement: document.createElement('button'),
        handleClose: jest.fn(),
        handleSelect: jest.fn(),
        items: ['item 1', 'item 2', 'item 3'],
        title: 'Title'
    };

    const renderComponent = (props: Partial<SelectMenuProps> = {}) =>
        renderWithIntl(SelectMenu, {...defaultProps, ...props});

    it('should render given menu items', async () => {
        const { queryByText } = renderComponent();

        defaultProps.items.forEach(menuItem => {
           expect(queryByText(menuItem)).toBeInTheDocument();
        });
        expect(queryByText('not existent')).not.toBeInTheDocument();
    });

    it('should not render any menu items when no anchor element is provided', () => {
        const { queryByText } = renderComponent({ anchorElement: null });

        defaultProps.items.forEach(menuItem => {
            expect(queryByText(menuItem)).not.toBeInTheDocument();
        });
    });

    it('should call handleSelect on menu item click', () => {
        const handleSelect = jest.fn();
        const { getByText } = renderComponent({ handleSelect });
        const menuItemToClick = getByText('item 2');

        fireEvent.click(menuItemToClick);

        expect(handleSelect).toHaveBeenCalledWith('item 2');
        expect(handleSelect).toHaveBeenCalledTimes(1);
    });
});