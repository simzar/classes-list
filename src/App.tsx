import React from 'react';
import styles from './App.module.scss';
import { FormattedMessage, IntlProvider } from 'react-intl';
import messages from './lang/en.json';

function App() {
    return (
        <div className={styles.app}>
            <header className={styles.appHeader}>
                <IntlProvider locale="en" messages={messages.translations}>
                    <FormattedMessage tagName="h1" id="classesList.classes"/>
                    <FormattedMessage tagName="h1" values={{ studentsCount: 1 }} id="studentsList.students"/>
                    <FormattedMessage tagName="h1" values={{ studentsCount: 2 }} id="studentsList.students"/>
                </IntlProvider>
            </header>
        </div>
    );
}

export default App;
