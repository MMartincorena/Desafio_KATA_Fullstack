import React, { useRef, useContext, useState } from 'react';
import { TodoStore, HOST_API } from './TodoProvider';


const TodoForm = (props) => {
    const formTodoRef = useRef(null);
    const { dispatch, state: { item } } = useContext(TodoStore);
    const [ state, setState ] = useState(item);

    const [ message, setMessage ] = useState(false);

    const onAdd = (event) => {
        event.preventDefault();
        //MENSAJE DE REQUISITO
        if(typeof(state.name) === 'undefined' || state.name.length < 3 || state.name.length > 50){
            setMessage(true);
            return;
        }
        const request = {
            name: state.name,
            id: null,
            isComplete: false,
            idTodoList: props.listId
        }
        fetch(HOST_API + "/todos", {
            method: "POST",
            body: JSON.stringify(request),
            headers: { "Content-Type": "application/json" }
        })
        .then(response => response.json())
        .then((todo) => {
            dispatch({ type: "add-item", item: todo });
            setState({ name: "" });
            formTodoRef.current.reset();
            setMessage(false);
        });
    }

    const onEdit = (event) => {
        event.preventDefault();
        if(state.name.length < 3 || state.name.length > 50){
            setMessage(true);
            return;
        }
        const request = {
            name: state.name,
            id: item.id,
            isComplete: item.isComplete,
            idTodoList: state.idTodoList
        };
        fetch(HOST_API + "/todos/ "+item.id, {
            method: "PUT",
            body: JSON.stringify(request),
            headers: { "Content-Type": "application/json" }
        })
        .then(response => response.json())
        .then((todo) => {
            dispatch({ type: "update-item", item: todo });
            setState({ name: "" });
            formTodoRef.current.reset();
            setMessage(false);
        });
    };

    return (
        <form ref={formTodoRef}>
            <div className='todo-header'>
                <input type="text" name="name" placeholder='Agregue una actividad...' defaultValue={item.name}
                onChange={(event) => {
                    setState({ ...state, name: event.target.value });
                }}></input>
                {!item.id && <button onClick={onAdd}>AGREGAR</button>}
                {item.id && <button onClick={onEdit}>EDITAR</button>}
            </div>
            {/* <p className={(message === true) ? 'errorMessage show' : 'errorMessage'}>You must enter between 3 and 50 characters.</p> */}
        </form>
    );
}
 
export default TodoForm;