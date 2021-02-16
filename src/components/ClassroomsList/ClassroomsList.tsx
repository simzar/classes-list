import React, { FormEvent, HTMLProps, useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import Button from '../Button';
import { ReactComponent as Add } from '../../assets/icons/add.svg';
import { ClassroomFormValues, ClassroomPreview, WithIntlProp } from '../../utils/types';
import classes from './ClassroomsList.module.scss';
import InputField from '../InputField';
import { Formik, Field, Form } from 'formik';
import { MAX_CLASSROOM_NAME_LENGTH } from '../../utils/constants';
import { executeOnEnter } from '../../utils';

interface ClassroomsListProps extends WithIntlProp {
    classrooms: ClassroomPreview[];
    addClassroom: (classroom: ClassroomFormValues) => void;
    isLoading: boolean;
}

const ClassroomsList: React.FC<ClassroomsListProps> = ({ classrooms, addClassroom, intl, isLoading }) => {
    const [showClassroomInput, setShowClassroomInput] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        showClassroomInput && inputRef.current?.focus();
    }, [showClassroomInput, inputRef]);

    return (
        <div className={classes.wrapper}>
            <Formik
                initialValues={{ name: '' }}
                onSubmit={async (values, { resetForm, setErrors }) => {
                    try {
                        await addClassroom(values);
                        resetForm();
                        setShowClassroomInput(false);
                    } catch (e) {
                        setErrors({ name: e.message });
                        console.error(e);
                        setTimeout(() => inputRef.current?.focus());
                    }
                }}
            >
                {({ isSubmitting, setFieldValue, submitForm }) => {
                    return (
                        <Form>
                            <div className={classes.header}>
                                <FormattedMessage tagName="h1" id="classroomsContainer.header"/>
                                <Button
                                    type="button"
                                    isLoading={isSubmitting || isLoading}
                                    Icon={Add}
                                    alt={intl.formatMessage({ id: 'classroomsContainer.alt.add' })}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShowClassroomInput(true)
                                    }}
                                />
                            </div>
                            <div className={classes.list}>
                                {classrooms.map(classroom => (
                                    <NavLink
                                        key={classroom}
                                        to={classroom}
                                        className={classes.listItem}
                                        activeClassName={classes.activeListItem}
                                    >
                                        {classroom}
                                    </NavLink>
                                ))}
                            </div>
                            {showClassroomInput && (
                                <Field
                                    name="name"
                                    component={InputField}
                                    placeholder="Add Class"
                                    disabled={isSubmitting || isLoading}
                                    onChange={(e: FormEvent<HTMLInputElement>) =>
                                        setFieldValue('name', e.currentTarget.value?.toUpperCase())}
                                    inputRef={inputRef}
                                    maxLength={MAX_CLASSROOM_NAME_LENGTH}
                                    onKeyDown={(event: HTMLProps<KeyboardEvent>) => executeOnEnter(event, submitForm)}
                                />
                            )}
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default ClassroomsList;