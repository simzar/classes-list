import React from 'react';
import StudentsList, { StudentsListProps } from '../StudentsList/StudentsList';
import { useLocation } from 'react-router-dom';

const StudentsListWrapper: React.FC<Omit<StudentsListProps, 'classroomName'>> = (props) => {
    const { pathname } = useLocation();
    const classroomName = pathname?.slice(1);

    return (
        <StudentsList key={classroomName} {...props} classroomName={classroomName} />
    );
};

export default StudentsListWrapper;