import React, { RefObject } from 'react';
import { FieldProps } from 'formik';
import TextField from '@material-ui/core/TextField';
import classes from './InputField.module.scss';

interface InputFieldProps extends FieldProps {
    className?: string;
    placeholder: string;
    disabled?: boolean;
    inputRef: RefObject<HTMLInputElement>;
    maxLength?: number;
    submitForm?: () => Promise<void>
}

const InputField: React.FC<InputFieldProps> = ({
    className = '',
    placeholder,
    field,
    disabled = false,
    inputRef,
    maxLength,
    submitForm,
    ...restProps
}) => (
    <TextField
        {...field}
        {...restProps}
        className={`${classes.wrapper} ${className}`}
        variant="outlined"
        placeholder={placeholder}
        disabled={disabled}
        inputRef={inputRef}
        inputProps={{ maxLength }}
    />
);

export default InputField;