import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, unstable_createMuiStrictModeTheme } from '@material-ui/core';
import classes from './SelectMenu.module.scss';

export interface SelectMenuProps {
    title: string;
    items: string[];
    handleSelect: (id: string) => void;
    anchorElement: HTMLButtonElement | null;
    handleClose: () => void;
}

const SelectMenu: React.FC<SelectMenuProps> = ({ title, items, handleSelect, anchorElement, handleClose }) => (
    <MuiThemeProvider theme={unstable_createMuiStrictModeTheme()}>
        <Menu
            open={!!anchorElement}
            anchorEl={anchorElement}
            onClose={handleClose}
            classes={{ paper: classes.root }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            style={{ transform: 'translate(25px, 35px)' }}
            autoFocus
        >
            <div className={classes.title}>{title}</div>
            {items.map((item) => (
                <MenuItem classes={{ root: classes.listItem }} key={item} onClick={() => handleSelect(item)}>
                    <Typography variant="inherit" noWrap>
                        {item}
                    </Typography>
                </MenuItem>
            ))}
        </Menu>
    </MuiThemeProvider>
);

export default SelectMenu;