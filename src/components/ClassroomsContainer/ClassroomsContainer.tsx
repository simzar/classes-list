import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import localforage from 'localforage';
import { v4 as uuid } from 'uuid';
import classes from './ClassroomsContainer.module.scss';
import ClassroomsList from '../ClassroomsList';
import StudentsList from '../StudentsList';
import { compareStudents, naivelyCompareClassrooms, sleep } from '../../utils';
import { Classroom, ClassroomFormValues, ClassroomPreview, StudentFormValues } from '../../utils/types';

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

    const addClassroom = async ({ name }: ClassroomFormValues) => {
        await sleep();
        const existingClassroom = await localforage.getItem(name);

        if (existingClassroom) {
            throw new Error('Classroom already exists');
        }

        await localforage.setItem<Classroom>(name, { id: uuid(), name, students: [] });

        setClassrooms([...classrooms, name].sort(naivelyCompareClassrooms));
    };

    const addStudent = async (classroomName: string, { studentName }: StudentFormValues) => {
        await sleep(400);

        const existingClassroom = await localforage.getItem<Classroom>(classroomName) as Classroom;

        return localforage.setItem<Classroom>(classroomName, {
            ...existingClassroom,
            students: [
                ...(existingClassroom?.students ?? []),
                {
                    id: uuid(),
                    name: studentName,
                }
            ].sort(compareStudents),
        });
    };

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

    return (
        <Router basename={process.env.PUBLIC_URL}>
            <div className={classes.wrapper}>
                <ClassroomsList
                    isLoading={isLoadingClassrooms}
                    classrooms={classrooms}
                    addClassroom={(v) => addClassroom(v)}
                />
                <StudentsList
                    addStudent={addStudent}
                    fetchClassroom={fetchClassroom}
                    removeStudent={removeStudent}
                />
            </div>
        </Router>
    );
};

export default ClassroomsContainer;