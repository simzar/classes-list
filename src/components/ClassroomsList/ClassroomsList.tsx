import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
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
                <NavLink
                    key={schoolClass}
                    to={schoolClass}
                    className={classes.listItem}
                    activeClassName={classes.activeListItem}
                >
                    {schoolClass}
                </NavLink>
            ))}
            <TextField className={classes.inputWrapper} variant="outlined" placeholder="Add Class"/>
        </div>
    </div>
);

export default ClassroomsList;