import React, { HTMLProps, useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router-dom';
import classes from './StudentsList.module.scss';
import { Classroom, Student, StudentFormValues } from '../../utils/types';
import StudentsListItem from '../StudentsListItem';
import { Field, Form, Formik } from 'formik';
import InputField from '../InputField';
import { MAX_STUDENT_NAME_LENGTH } from '../../utils/constants';
import { executeOnEnter } from '../../utils';

interface StudentsListProps {
    addStudent: (classroomName: string, values: StudentFormValues) => Promise<Classroom>;
    removeStudent: (classroomName: string, studentId: string) => Promise<Classroom>;
    fetchClassroom: (classroomName: string) => Promise<Classroom | null>;
}

const StudentsList: React.FC<StudentsListProps> = ({ fetchClassroom, removeStudent, addStudent }) => {
    const { pathname } = useLocation();
    const classroomName = pathname?.slice(1);

    const inputRef = useRef<HTMLInputElement>(null);

    const [students, setStudents] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isNoClassSelected, setIsNoClassSelected] = useState<boolean>(false);

    useEffect(() => {
        const loadStudents = async () => {
            setIsLoading(true);
            const classroom = await fetchClassroom(classroomName);
            setStudents(classroom?.students ?? []);

            setIsNoClassSelected(!classroom);
            setIsLoading(false);
        };

        loadStudents();
    }, [classroomName]);

    const handleRemoveStudent = async (studentId: string) => {
        const classroom = await removeStudent(classroomName, studentId);
        setStudents(classroom?.students ?? []);
    };

    return (
        <div className={classes.wrapper}>
            <h1>
                {isLoading ? 'Loading' : isNoClassSelected ? 'Please select a classroom' : classroomName}
                <span className={classes.headerSubtext}>
                    <FormattedMessage
                        id="studentsList.students"
                        values={{ studentsCount: students.length }}
                    />
                </span>
            </h1>
            {classroomName && (
                <Formik
                    initialValues={{ studentName: '' }}
                    onSubmit={async (values, { resetForm }) => {
                        try {
                            const classroom = await addStudent(classroomName, values);

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
                    handleRemoveClick={(id) => handleRemoveStudent(id)}
                    {...student}
                />
            ))}
        </div>
    );
}

export default StudentsList;