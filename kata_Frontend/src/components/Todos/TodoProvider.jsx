import { createContext, useReducer } from "react";
import TodoReducer from "./TodoReducer";


const TodoProvider = ({ children }) => {
    const todoInitialState = {
        list: [],
        item: {}
    };
    const [state, dispatch] = useReducer(TodoReducer, todoInitialState);
    return (
        <TodoStore.Provider value={{ state, dispatch }}>{ children }</TodoStore.Provider>
    );
}

export const HOST_API = "http://localhost:8081/api";
export const TodoStore = createContext();
export default TodoProvider;