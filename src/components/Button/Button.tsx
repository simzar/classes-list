import React, { MouseEventHandler } from 'react';
import IconButton from '@material-ui/core/IconButton';
import classes from './Button.module.scss';

interface ButtonProps {
    alt: string;
    className?: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
}

const Button: React.FC<ButtonProps> = ({ onClick, className, Icon, alt }) => (
    <IconButton onClick={onClick} classes={{ root: `${classes.root} ${className}` }}>
        <Icon title={alt} />
    </IconButton>
);

export default Button;