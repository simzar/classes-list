import React from 'react';
import ClassroomsContainer from '../ClassroomsContainer';
import classes from './App.module.scss';

const App: React.FC = () => (
    <div className={classes.wrapper}>
        <ClassroomsContainer/>
    </div>
);

export default App;