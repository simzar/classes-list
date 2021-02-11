import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Route } from 'react-router';
import classes from './ClassroomsContainer.module.scss';
import ClassroomsList from '../ClassroomsList';
import StudentsList from '../StudentsList';

const schoolClasses = [
    '1A', '1B', '1C'
];

const students = [
    'Steve',
    'John',
    'Eve'
];

const ClassroomsContainer: React.FC = () => {

    return (
        <Router>
            <div className={classes.wrapper}>
                <ClassroomsList classrooms={schoolClasses} addClassroom={(e, v) => console.log('add: ', v)}/>
                <Switch>
                    {schoolClasses.map(schoolClass => (
                        <Route key={schoolClass} path={`/${schoolClass}`}>
                            <StudentsList students={students} classroomName={schoolClass} />
                        </Route>
                    ))}
                </Switch>
            </div>
        </Router>
    );
};

export default ClassroomsContainer;