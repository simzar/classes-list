import React from 'react';
import ClassesContainer from '../ClassesContainer';
import classes from './App.module.scss';

const App: React.FC = () => (
    <div className={classes.wrapper}>
        <ClassesContainer/>
    </div>
);

export default App;