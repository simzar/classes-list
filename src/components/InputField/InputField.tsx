import React from 'react';
import TextField from '@material-ui/core/TextField';
import classes from './InputField.module.scss';

interface InputFieldProps {
    className?: string;
    placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({ className = '', placeholder }) => (
    <TextField className={`${classes.wrapper} ${className}`} variant="outlined" placeholder={placeholder}/>
);

export default InputField;