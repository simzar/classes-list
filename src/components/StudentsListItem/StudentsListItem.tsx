import React from 'react';
import classes from './StudentsListItem.module.scss';
import { Student, WithIntlProp } from '../../utils/types';
import Button from '../Button';
import { ReactComponent as Move } from '../../assets/icons/move.svg';
import { ReactComponent as Remove } from '../../assets/icons/remove.svg';

interface StudentsListItemProps extends Student, WithIntlProp {
    handleMoveClick: (id: string) => void;
    handleRemoveClick: (id: string) => void;
}

const StudentsListItem: React.FC<StudentsListItemProps> = ({ id, name, handleMoveClick, handleRemoveClick, intl }) => (
    <div className={classes.wrapper}>
        {name}
        <div className={classes.actions}>
            <Button
                className={classes.actionButton}
                onClick={() => handleMoveClick(id)}
                Icon={Move}
                alt={intl.formatMessage({ id: 'studentsList.alt.moveTo' })}
            />
            <Button
                className={classes.actionButton}
                onClick={() => handleRemoveClick(id)}
                Icon={Remove}
                alt={intl.formatMessage({ id: 'studentsList.alt.remove' })}
            />
        </div>
    </div>
);

export default StudentsListItem;