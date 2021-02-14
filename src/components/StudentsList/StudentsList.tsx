import React, { HTMLProps, useEffect, useRef, useState } from 'react';
import classes from './StudentsList.module.scss';
import { FormattedMessage } from 'react-intl';
import { Classroom, Student, StudentFormValues } from '../../utils/types';
import StudentsListItem from '../StudentsListItem';
import { Field, Form, Formik } from 'formik';
import InputField from '../InputField';
import { MAX_STUDENT_NAME_LENGTH } from '../../utils/constants';
import { executeOnEnter } from '../../utils';

interface StudentsListProps {
    name: string | null;
    addStudent: (classroomName: string, values: StudentFormValues) => Promise<Classroom>;
    fetchClassroom: (classroomName: string) => Promise<Classroom | null>;
}

const StudentsList: React.FC<StudentsListProps> = ({ name, fetchClassroom, addStudent }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [students, setStudents] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const loadStudents = async () => {
            if (!name) return;

            setIsLoading(true);
            const classroom = await fetchClassroom(name);
            setStudents(classroom?.students ?? []);
            setIsLoading(false);
        };

        loadStudents();
    }, [name]);

    return (
        <div className={classes.wrapper}>
            <h1>
                {isLoading ? 'Loading' : name ?? 'No classroom selected'}
                <span className={classes.headerSubtext}>
                    <FormattedMessage
                        id="studentsList.students"
                        values={{ studentsCount: students.length }}
                    />
                </span>
            </h1>
            {name && (
                <Formik
                    initialValues={{ studentName: '' }}
                    onSubmit={async (values, { resetForm }) => {
                        try {
                            const classroom = await addStudent(name, values);

                            resetForm();
                            setStudents(classroom.students);
                            //    TODO: focus magic
                        } catch (e) {
                            console.error(e);
                        }
                    }}
                >
                    {({ isSubmitting, submitForm }) => (
                        <Form>
                            <Field
                                className={classes.input}
                                name="studentName"
                                component={InputField}
                                placeholder="Add Student"
                                disabled={isSubmitting || isLoading}
                                validate={(value: string) => !!value?.trim() ? undefined : 'Value cannot be empty'}
                                inputRef={inputRef}
                                maxLength={MAX_STUDENT_NAME_LENGTH}
                                onKeyDown={(event: HTMLProps<KeyboardEvent>) => executeOnEnter(event, submitForm)}
                            />
                        </Form>
                    )}
                </Formik>
            )}
            {students?.map(student => (
                <StudentsListItem
                    key={student.id}
                    handleMoveClick={(id) => console.log('move: ', id)}
                    handleRemoveClick={(id) => console.log('remove: ', id)}
                    {...student}
                />
            ))}
        </div>
    );
}

export default StudentsList;