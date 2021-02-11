import React from 'react';
import classes from './ClassesContainer.module.scss';
import { FormattedMessage, IntlShape } from 'react-intl';
import add from '../assets/icons/add.svg';
import Button from '../components/Button';

interface ClassesContainerProps  {
    intl: IntlShape;
}

const schoolClasses = [
    '1A', '1B', '1C'
];

const ClassesContainer: React.FC<ClassesContainerProps> = ({ intl }) => (
    <div className={classes.wrapper}>
        <div className={classes.header}>
            <FormattedMessage tagName="h1" id="classesContainer.header"/>
            <Button
                onClick={() => console.log('add')}
                icon={add}
                alt={intl.formatMessage({ id: 'classesContainer.alt.add' })}
            />
        </div>
        <div className={classes.list}>
            {schoolClasses.map(schoolClass => (
                <h2 key={schoolClass}>{schoolClass}</h2>
            ))}
        </div>
    </div>
);

export default ClassesContainer;