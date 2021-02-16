import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import localforage from 'localforage';
import { v4 as uuid } from 'uuid';
import classes from './ClassroomsContainer.module.scss';
import ClassroomsList from '../ClassroomsList';
import { compareStudents, naivelyCompareClassrooms, sleep } from '../../utils';
import { Classroom, ClassroomFormValues, ClassroomPreview, Student, StudentFormValues } from '../../utils/types';
import StudentsListWrapper from '../StudentsListWrapper';

const ClassroomsContainer: React.FC = () => {
    const [classrooms, setClassrooms] = useState<ClassroomPreview[]>([]);
    const [isLoadingClassrooms, setIsLoadingClassrooms] = useState<boolean>(false);

    useEffect(() => {
        fetchClassroomsList();
    }, []);

    const fetchClassroomsList = async () => {
        setIsLoadingClassrooms(true);
        await sleep();

        const classroomsList = await localforage.keys();

        setClassrooms(classroomsList.sort(naivelyCompareClassrooms));
        setIsLoadingClassrooms(false);
    };

    const createClassroom = async ({ name }: ClassroomFormValues) => {
        await sleep();

        if (!name?.trim()) {
            throw new Error('Value cannot be empty');
        }

        const existingClassroom = await localforage.getItem(name);

        if (existingClassroom) {
            throw new Error('Classroom already exists');
        }

        await localforage.setItem<Classroom>(name, { id: uuid(), name, students: [] });

        setClassrooms([...classrooms, name].sort(naivelyCompareClassrooms));
    };

    const insertStudent = async (classroomName: string, { name, id }: Student) => {
        await sleep(400);

        if (!name?.trim()) {
            throw new Error('Value cannot be empty');
        }

        const existingClassroom = await localforage.getItem<Classroom>(classroomName) as Classroom;

        return localforage.setItem<Classroom>(classroomName, {
            ...existingClassroom,
            students: [
                ...(existingClassroom?.students ?? []),
                {
                    id,
                    name,
                }
            ].sort(compareStudents),
        });
    };

    const createStudent = async (classroomName: string, { studentName }: StudentFormValues) =>
        insertStudent(classroomName, { name: studentName, id: uuid() });

    const fetchClassroom = async (classroomName: string) => {
        await sleep(400);

        return localforage.getItem<Classroom>(classroomName);
    };

    const removeStudent = async (classroomName: string, studentId: string) => {
        await sleep();

        const existingClassroom = await localforage.getItem<Classroom>(classroomName) as Classroom;

        return localforage.setItem(classroomName, {
            ...existingClassroom,
            students: existingClassroom.students.filter(({ id }) => id !== studentId),
        });
    };

    const moveStudent = async (sourceClassroomName: string, destinationClassroomName: string, studentId: string) => {
        const sourceClassroom = await localforage.getItem<Classroom>(sourceClassroomName) as Classroom;

        const studentToMove = sourceClassroom.students.find(({ id }) => id === studentId);

        if (!studentToMove) return sourceClassroom;

        const [source] = await Promise.all([
            removeStudent(sourceClassroomName, studentId),
            insertStudent(destinationClassroomName, studentToMove)
        ]);

        return source as Classroom;
    };

    return (
        <Router basename={process.env.PUBLIC_URL}>
            <div className={classes.wrapper}>
                <ClassroomsList
                    isLoading={isLoadingClassrooms}
                    classrooms={classrooms}
                    addClassroom={(v) => createClassroom(v)}
                />
                <StudentsListWrapper
                    addStudent={createStudent}
                    fetchClassroom={fetchClassroom}
                    removeStudent={removeStudent}
                    moveStudent={moveStudent}
                    classrooms={classrooms}
                />
            </div>
        </Router>
    );
};

export default ClassroomsContainer;