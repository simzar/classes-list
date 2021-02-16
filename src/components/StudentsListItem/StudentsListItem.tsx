import React, { useState } from 'react';
import classes from './StudentsListItem.module.scss';
import { ClassroomPreview, Student, WithIntlProp } from '../../utils/types';
import Button from '../Button';
import { ReactComponent as Move } from '../../assets/icons/move.svg';
import { ReactComponent as Remove } from '../../assets/icons/remove.svg';
import SelectMenu from '../SelectMenu';

export interface StudentsListItemProps extends Student, WithIntlProp {
    handleMoveClick: (id: string) => void;
    handleRemoveClick: (id: string) => void;
    moveToOptions: ClassroomPreview[];
}

const StudentsListItem: React.FC<StudentsListItemProps> = ({ id, name, handleMoveClick, handleRemoveClick, intl, moveToOptions }) => {
    const [menuAnchorElement, setMenuAnchorElement] = useState<HTMLButtonElement | null>(null);
    const [isRemoving, setIsRemoving] = useState<boolean>(false);
    const [isMoving, setIsMoving] = useState<boolean>(false);

    const onRemoveClick = async () => {
        setIsRemoving(true);
        await handleRemoveClick(id);
    };

    const onMoveClick = async (toClassId: string) => {
        setMenuAnchorElement(null);
        setIsMoving(true);
        await handleMoveClick(toClassId);
    };

    return (
        <div className={classes.wrapper}>
            {name}
            <div className={classes.actions}>
                <Button
                    className={classes.actionButton}
                    onClick={(event) => setMenuAnchorElement(event.currentTarget)}
                    Icon={Move}
                    isLoading={isMoving}
                    disabled={isRemoving}
                    alt={intl.formatMessage({ id: 'studentsList.alt.moveTo' })}
                />
                <Button
                    className={classes.actionButton}
                    onClick={() => onRemoveClick()}
                    Icon={Remove}
                    isLoading={isRemoving}
                    disabled={isMoving}
                    alt={intl.formatMessage({ id: 'studentsList.alt.remove' })}
                />
                <SelectMenu
                    title={intl.formatMessage({ id: 'studentsList.moveTo' })}
                    handleClose={() => setMenuAnchorElement(null)}
                    items={moveToOptions}
                    handleSelect={(v) => onMoveClick(v)}
                    anchorElement={menuAnchorElement}
                />
            </div>
        </div>
    );
}

export default StudentsListItem;