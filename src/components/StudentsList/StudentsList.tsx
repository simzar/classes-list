import React from 'react';
import classes from './StudentsList.module.scss';
import { FormattedMessage } from 'react-intl';
import InputField from '../InputField';
import { Student } from '../../utils/types';
import StudentsListItem from '../StudentsListItem';

interface StudentsListProps {
    students: Student[];
    name: string;
}

const StudentsList: React.FC<StudentsListProps> = ({ name, students = [] }) => {
    return (
        <div className={classes.wrapper}>
            <h1>
                {name}
                <span className={classes.headerSubtext}>
                    <FormattedMessage
                        id="studentsList.students"
                        values={{ studentsCount: students.length }}
                    />
                </span>
            </h1>
            <InputField className={classes.input} placeholder="Add Student"/>
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