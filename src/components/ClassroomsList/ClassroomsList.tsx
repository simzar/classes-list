import React from 'react';
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
}

const ClassroomsList: React.FC<ClassroomsListProps> = ({ classrooms, addClassroom, intl }) => (
    <div className={classes.wrapper}>
        <Formik
            initialValues={{ name: '' }}
            onSubmit={async (values, { resetForm }) => {
                try {
                    if (!values.name) return;
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
                                isLoading={isSubmitting}
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
                            disabled={isSubmitting}
                            onChange={(e: any) => setFieldValue('name', e.target.value?.toUpperCase())}
                        />
                    </Form>
                )
            }}
        </Formik>
    </div>
);

export default ClassroomsList;