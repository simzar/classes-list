import React from 'react';
import { FieldProps } from 'formik';
import TextField from '@material-ui/core/TextField';
import classes from './InputField.module.scss';

interface InputFieldProps extends FieldProps {
    className?: string;
    placeholder: string;
    disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ className = '', placeholder, field, disabled = false, ...restProps }) => (
    <TextField
        {...field}
        {...restProps}
        className={`${classes.wrapper} ${className}`}
        variant="outlined"
        placeholder={placeholder}
        disabled={disabled}
    />
);

export default InputField;