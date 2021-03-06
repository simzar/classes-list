import React, { HTMLProps, useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import classes from './StudentsList.module.scss';
import { Classroom, ClassroomPreview, Student, StudentFormValues, WithIntlProp } from '../../utils/types';
import StudentsListItem from '../StudentsListItem';
import { Field, Form, Formik } from 'formik';
import InputField from '../InputField';
import { MAX_STUDENT_NAME_LENGTH } from '../../utils/constants';
import { executeOnEnter } from '../../utils';

export interface StudentsListProps extends WithIntlProp {
    addStudent: (classroomName: string, values: StudentFormValues) => Promise<Classroom>;
    removeStudent: (classroomName: string, studentId: string) => Promise<Classroom>;
    fetchClassroom: (classroomName: string) => Promise<Classroom | null>;
    moveStudent: (source: string, destination: string, studentId: string) => Promise<Classroom>;
    classrooms: ClassroomPreview[];
    classroomName: string;
}

const StudentsList: React.FC<StudentsListProps> = ({
    fetchClassroom,
    removeStudent,
    addStudent,
    classrooms,
    moveStudent,
    classroomName,
    intl,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const componentRef = useRef<boolean>(false);

    const [students, setStudents] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isNoClassSelected, setIsNoClassSelected] = useState<boolean>(false);
    const [moveToOptions, setMoveToOptions] = useState<ClassroomPreview[]>([]);

    useEffect(() => {
        const loadStudents = async () => {
            setIsLoading(true);
            setStudents([]);
            const classroom = await fetchClassroom(classroomName);
            setStudents(classroom?.students ?? []);

            setIsNoClassSelected(!classroom);
            setIsLoading(false);
        };

        componentRef.current = true;
        loadStudents();

        return () => {
            componentRef.current = false;
        };
    }, [classroomName]);

    useEffect(() => {
        setMoveToOptions(classrooms.filter(classroom => classroom !== classroomName));
    }, [classrooms, classroomName]);

    const handleRemoveStudent = async (studentId: string) => {
        const classroom = await removeStudent(classroomName, studentId);
        if (classroom?.name !== classroomName) return;

        componentRef.current && setStudents(classroom?.students ?? []);
    };

    const handleMoveStudent = async (source: string, destination: string, studentId: string) => {
        const classroom = await moveStudent(source, destination, studentId);
        if (classroom?.name !== classroomName) return;

        componentRef.current && setStudents(classroom?.students ?? []);
    };

    return (
        <div key={classroomName} className={classes.wrapper}>
            <h1>
                {isLoading
                    ? <FormattedMessage id="common.loading" />
                    : isNoClassSelected
                        ? <FormattedMessage id="studentsList.empty" />
                        : classroomName}
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
                    onSubmit={async (values, { resetForm, setErrors }) => {
                        try {
                            const classroom = await addStudent(classroomName, values);

                            resetForm();
                            setStudents(classroom.students);
                            inputRef.current?.focus();
                        } catch (e) {
                            console.error(e);
                            setErrors({ studentName: e.message });
                            setTimeout(() => inputRef.current?.focus());
                        }
                    }}
                >
                    {({ isSubmitting, submitForm }) => (
                        <Form>
                            <Field
                                className={classes.input}
                                name="studentName"
                                component={InputField}
                                placeholder={intl.formatMessage({ id: 'studentsList.placeholder.addStudent' })}
                                disabled={isSubmitting || isLoading}
                                inputRef={inputRef}
                                maxLength={MAX_STUDENT_NAME_LENGTH}
                                onKeyDown={(event: HTMLProps<KeyboardEvent>) => executeOnEnter(event, submitForm)}
                            />
                        </Form>
                    )}
                </Formik>
            )}
            <div className={classes.list}>
                {students?.map(student => (
                    <StudentsListItem
                        key={student.id}
                        handleMoveClick={(destination) => handleMoveStudent(classroomName, destination, student.id)}
                        handleRemoveClick={(id) => handleRemoveStudent(id)}
                        moveToOptions={moveToOptions}
                        {...student}
                    />
                ))}
            </div>
        </div>
    );
}

export default StudentsList;