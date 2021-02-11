import React from 'react';
import classes from './ClassroomsContainer.module.scss';
import { FormattedMessage, IntlShape } from 'react-intl';
import addIcon from '../../assets/icons/add.svg';
import Button from '../Button';

interface ClassroomsContainerProps  {
    intl: IntlShape;
}

const schoolClasses = [
    '1A', '1B', '1C'
];

const ClassroomsContainer: React.FC<ClassroomsContainerProps> = ({ intl }) => (
    <div className={classes.wrapper}>
        <div className={classes.header}>
            <FormattedMessage tagName="h1" id="classroomsContainer.header"/>
            <Button
                onClick={() => console.log('add')}
                icon={addIcon}
                alt={intl.formatMessage({ id: 'classroomsContainer.alt.add' })}
            />
        </div>
        <div className={classes.list}>
            {schoolClasses.map(schoolClass => (
                <h2 key={schoolClass}>{schoolClass}</h2>
            ))}
        </div>
    </div>
);

export default ClassroomsContainer;