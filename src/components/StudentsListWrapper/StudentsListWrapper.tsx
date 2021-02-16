import React from 'react';
import { useLocation } from 'react-router-dom';
import StudentsList from '../StudentsList';
import { StudentsListProps } from '../StudentsList/StudentsList';

const StudentsListWrapper: React.FC<Omit<StudentsListProps, 'intl' | 'classroomName'>> = (props) => {
    const { pathname } = useLocation();
    const classroomName = pathname?.slice(1);

    return (
        <StudentsList key={classroomName} {...props} classroomName={classroomName} />
    );
};

export default StudentsListWrapper;