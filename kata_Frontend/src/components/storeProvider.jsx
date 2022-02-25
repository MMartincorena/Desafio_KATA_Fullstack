import React, {useReducer, createContext } from 'react';
import reducerTodo from './reducerTodo'

const Store = createContext()

const StoreProvider = ({ children }) => {

    const initialState = {
        todo: { list: [], item: {} }
    };

    const [state, dispatch] = useReducer(reducerTodo, initialState);

    return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
}

export default StoreProvider;
export { Store };