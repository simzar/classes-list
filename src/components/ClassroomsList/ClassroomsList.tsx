import React, { FormEvent } from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import Button from '../Button';
import { ReactComponent as Add } from '../../assets/icons/add.svg';
import { ClassroomFormValues, ClassroomPreview, WithIntlProp } from '../../utils/types';
import classes from './ClassroomsList.module.scss';
import InputField from '../InputField';
import { Formik, Field, Form } from 'formik';

interface ClassroomsListProps extends WithIntlProp {
    classrooms: ClassroomPreview[];
    addClassroom: (classroom: ClassroomFormValues) => void;
    isLoading: boolean;
}

const MAX_CLASSROOM_NAME_LENGTH = 50;

const ClassroomsList: React.FC<ClassroomsListProps> = ({ classrooms, addClassroom, intl, isLoading }) => (
    <div className={classes.wrapper}>
        <Formik
            initialValues={{ name: '' }}
            onSubmit={async (values, { resetForm }) => {
                try {
                    await addClassroom(values);
                    resetForm();
                } catch (e) {
                    console.error(e);
                }
            }}
        >
            {({ isSubmitting, setFieldValue }) => {
                return (
                    <Form>
                        <div className={classes.header}>
                            <FormattedMessage tagName="h1" id="classroomsContainer.header"/>
                            <Button
                                type="submit"
                                isLoading={isSubmitting || isLoading}
                                Icon={Add}
                                alt={intl.formatMessage({ id: 'classroomsContainer.alt.add' })}
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
                        <Field
                            name="name"
                            component={InputField}
                            placeholder="Add Class"
                            disabled={isSubmitting || isLoading}
                            onChange={(e: FormEvent<HTMLInputElement>) =>
                                setFieldValue('name', e.currentTarget.value?.toUpperCase().slice(0, MAX_CLASSROOM_NAME_LENGTH))}
                            validate={(value: string) => !!value.trim() ? undefined : 'Value cannot be empty'}
                        />
                    </Form>
                );
            }}
        </Formik>
    </div>
);

export default ClassroomsList;