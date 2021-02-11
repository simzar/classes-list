import React, { MouseEventHandler } from 'react';
import IconButton from '@material-ui/core/IconButton';
import classes from './Button.module.scss';

interface ButtonProps {
    onClick: MouseEventHandler;
    icon: string;
    alt: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, icon, alt }) => (
    <IconButton onClick={onClick} classes={classes}>
        <img src={icon} alt={alt}/>
    </IconButton>
);

export default Button;