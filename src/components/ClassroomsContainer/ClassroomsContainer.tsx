import React from 'react';
import classes from './ClassroomsContainer.module.scss';
import ClassroomsList from '../ClassroomsList';
import StudentsList from '../StudentsList';

const schoolClasses = [
    '1A', '1B', '1C'
];

const ClassroomsContainer: React.FC = () => (
    <div className={classes.wrapper}>
        <ClassroomsList classrooms={schoolClasses} addClassroom={(e, v) => console.log('add: ', v)} />
        <StudentsList />
    </div>
);

export default ClassroomsContainer;