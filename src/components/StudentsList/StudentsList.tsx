import React from 'react';
import classes from './StudentsList.module.scss';

interface StudentsListProps {
    students: string[];
    classroomName: string;
}

const StudentsList: React.FC<StudentsListProps> = ({ classroomName, students }) => {
    return (
        <div className={classes.wrapper}>
            {classroomName}:
            <div>
                <ul>
                    {students?.map(student => (
                        <li key={student}>{student}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default StudentsList;