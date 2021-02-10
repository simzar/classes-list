import React from 'react';
import './App.css';
import { FormattedMessage, IntlProvider } from 'react-intl';
import messages from './lang/en.json';

function App() {
    return (
        <div className="App">
            <header className="App-header">
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
