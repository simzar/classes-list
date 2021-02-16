import React, { forwardRef, HTMLProps, MouseEventHandler, SVGProps } from 'react';
import classes from './Button.module.scss';

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
    alt: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    Icon: React.FC<SVGProps<SVGSVGElement> & { title?: string }>;
    type?: "button" | "submit" | "reset" | undefined;
    isLoading?: boolean;
}

const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = ({
    type = 'button',
    Icon,
    alt,
    className = '',
    disabled = false,
    isLoading = false,
    ...restProps
}, ref) => (
    <button
        {...restProps}
        disabled={disabled || isLoading}
        className={`${classes.root} ${isLoading ? classes.loading : ''} ${className}`}
        ref={ref}
    >
        <Icon title={alt} />
    </button>
);

export default forwardRef<HTMLButtonElement, ButtonProps>(Button);