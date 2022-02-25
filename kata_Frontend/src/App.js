import React from 'react';
import StoreProvider from './components/storeProvider';
import List from './components/list';
import Form from './components/form';

function App() {
  return <StoreProvider>
    <h3>To-Do List</h3>
    <Form />
    <List />
  </StoreProvider>
}

export default App;
