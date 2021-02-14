import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import localforage from 'localforage';
import { v4 as uuid } from 'uuid';
import classes from './ClassroomsContainer.module.scss';
import ClassroomsList from '../ClassroomsList';
import StudentsList from '../StudentsList';
import { naivelyCompareClassrooms, sleep } from '../../utils';
import { ClassroomFormValues, ClassroomPreview } from '../../utils/types';

const ClassroomsContainer: React.FC = () => {
    const [classrooms, setClassrooms] = useState<ClassroomPreview[]>([]);

    useEffect(() => {
        fetchClassroomsList();
    }, []);

    const fetchClassroomsList = async () => {
        await sleep();

        const classroomsList = await localforage.keys();

        setClassrooms(classroomsList.sort(naivelyCompareClassrooms));
    };

    const addClassroom = async ({ name }: ClassroomFormValues) => {
        await sleep();
        const existingClassroom = await localforage.getItem(name);

        if (existingClassroom) {
            throw new Error('Classroom already exists');
        }

        await localforage.setItem(name, { id: uuid(), name, students: [] });

        setClassrooms(
            [
                ...classrooms,
                name,
            ].sort(naivelyCompareClassrooms)
        );
    };

    return (
        <Router basename={process.env.PUBLIC_URL}>
            <div className={classes.wrapper}>
                <ClassroomsList classrooms={classrooms} addClassroom={(v) => addClassroom(v)}/>
                <Switch>
                    {classrooms.map(classroom => (
                        <Route key={classroom} path={`/${classroom}`}>
                            <StudentsList name={classroom}/>
                        </Route>
                    ))}
                    <Route>
                        <Redirect to={`${classrooms[0] ?? ''}`}/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default ClassroomsContainer;