import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { MuiThemeProvider, unstable_createMuiStrictModeTheme } from '@material-ui/core';

export interface SelectMenuProps {
    title: string;
    items: string[];
    handleSelect: (id: string) => void;
    anchorElement: HTMLButtonElement | null;
    handleClose: () => void;
}

// TODO: all aria attributes, etc.
const SelectMenu: React.FC<SelectMenuProps> = ({ title, items, handleSelect, anchorElement, handleClose }) => (
    <MuiThemeProvider theme={unstable_createMuiStrictModeTheme()}>
        <Menu open={!!anchorElement} anchorEl={anchorElement} onClose={handleClose}>
            {title}
            {items.map((item) => (
                <MenuItem key={item} onClick={() => handleSelect(item)}>{item}</MenuItem>
            ))}
        </Menu>
    </MuiThemeProvider>
);

export default SelectMenu;