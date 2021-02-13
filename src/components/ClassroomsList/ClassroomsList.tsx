import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import Button from '../Button';
import { ReactComponent as Add } from '../../assets/icons/add.svg';
import { WithIntlProp } from '../../utils/types';
import classes from './ClassroomsList.module.scss';
import InputField from '../InputField';


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
                Icon={Add}
                alt={intl.formatMessage({ id: 'classroomsContainer.alt.add' })}
            />
        </div>
        <div className={classes.list}>
            {classrooms.map(schoolClass => (
                <NavLink
                    key={schoolClass}
                    to={schoolClass}
                    className={classes.listItem}
                    activeClassName={classes.activeListItem}
                >
                    {schoolClass}
                </NavLink>
            ))}
        </div>
        <InputField placeholder="Add Class"/>
    </div>
);

export default ClassroomsList;