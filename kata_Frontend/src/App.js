import React, { Fragment } from 'react';
import ListProvider from './components/Lists/ListProvider';
import ListForm from './components/Lists/ListForm';
import ListView from './components/Lists/ListView';


function App() {
    return (
        <Fragment>
            <div className='title-container'>
                <h1 className='title'>LISTA  TO-DO</h1>
            </div>
            <hr/>
            <hr/>
            <div className='espacio'></div>
            
            <ListProvider>
                <ListForm />
                <div className='espacioBlanco'>
                <ListView />
                </div>
            </ListProvider>
        </Fragment>
    );
}

export default App;
