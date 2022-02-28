import React, { useRef, useContext, useState } from 'react';
import { TodoStore, HOST_API } from './TodoProvider';


const TodoForm = (props) => {
    const formTodoRef = useRef(null);
    const { dispatch, state: { item } } = useContext(TodoStore);
    const [ state, setState ] = useState(item);

    // const [ message, setMessage ] = useState(false);

    const onAdd = (event) => {
        event.preventDefault();
        //MENSAJE DE REQUISITO
        if(typeof(state.name) === 'undefined'){
            window.alert("Ingrese una actividad nueva, y que no se repita");

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
        });
    }

    const onEdit = (event) => {
        event.preventDefault();
        if(typeof(state.name) === 'undefined'){
            window.alert("Ingrese una actividad nueva, y/o que no se repita");
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
        });
    };

    return (
        <form ref={formTodoRef}>
            <div className='todo-header'>
                <input type="text" name="name" placeholder='¿Qué piensas hacer?' defaultValue={item.name}
                onChange={(event) => {
                    setState({ ...state, name: event.target.value });
                }}></input>
                {!item.id && <button onClick={onAdd}>AGREGAR</button>}
                {item.id && <button onClick={onEdit}>EDITAR</button>}
            </div>
        </form>
    );
}
 
export default TodoForm;