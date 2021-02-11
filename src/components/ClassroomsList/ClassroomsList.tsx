import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Button from '../Button';
import addIcon from '../../assets/icons/add.svg';
import { WithIntlProp } from '../../utils/types';
import classes from './ClassroomsList.module.scss';


interface ClassroomsListProps extends WithIntlProp {
    classrooms: string[];
    addClassroom: (event: React.MouseEvent<HTMLButtonElement>, classroom: string) => void;
}

const ClassroomsList: React.FC<ClassroomsListProps> = ({ classrooms, addClassroom, intl }) => (
    <div className={classes.wrapper}>
        <div className={classes.header}>
            <FormattedMessage tagName="h1" id="classroomsContainer.header"/>
            <Button
                onClick={(e) => addClassroom(e, 'new class')}
                icon={addIcon}
                alt={intl.formatMessage({ id: 'classroomsContainer.alt.add' })}
            />
        </div>
        <div className={classes.list}>
            {classrooms.map(schoolClass => (
                <Link key={schoolClass} to={schoolClass}>
                    <h2 key={schoolClass}>{schoolClass}</h2>
                </Link>
            ))}
        </div>
    </div>
);

export default ClassroomsList;