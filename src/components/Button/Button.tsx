import React, { MouseEventHandler } from 'react';
import classes from './Button.module.scss';

interface ButtonProps {
    alt: string;
    className?: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
}

const Button: React.FC<ButtonProps> = ({ onClick, className, Icon, alt }) => (
    <button onClick={onClick} className={`${classes.root} ${className}`}>
        <Icon title={alt} />
    </button>
);

export default Button;